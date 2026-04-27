<script lang="ts">
	import TarotCard from '$lib/components/TarotCard.svelte';
	import TarotInterpretation from '$lib/components/TarotInterpretation.svelte';
	import TarotScroll from '$lib/components/TarotScroll.svelte';
	import { tarotDeck } from '$lib/data/tarotDeck';
	import Button from '$lib/components/Button.svelte';
	import type { TarotCardData } from '$lib/data/tarotDeck';
	import { base } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/i18n/translations';
	import { interpretTarot } from '$lib/api/tarot';
	import { onMount } from 'svelte';
	import TarotPrompt from '$lib/components/TarotPrompt.svelte';
	import { goto } from '$app/navigation';
	import { preloadCardBackImage } from '$lib/images/cardBack';
	import { createTarotSession, tarotSession, type TarotMode } from '$lib/stores/tarotSession';

	const guideImage = 'intro/the_veil.png';

	let t;

	let allCardsFlipped: boolean = false;

	let cardCount: 1 | 2 | 3 = 3;
	// restrict to valid spread sizes

	let isDealing = false;
	let isReady = false;
	let dealtIds = new Set<string>();
	let imageReadyIds = new Set<string>();

	let selectedSuggestionIndex: number | null = null;
	// Tracks whether the current question was auto-filled from suggestions
	let scrollQuestionIndex = 0;

	let previousCardCount: 1 | 2 | 3 = cardCount;
	// Used to detect spread size changes

	let isLoading = false;
	let error: string = '';
	let hasSelectedMode = false;

	let displayedInterpretation: string = '';
	let typingInterval: ReturnType<typeof setInterval> | null = null;

	let activeFetchKey = '';
	let loadedInterpretationKey = '';
	let failedInterpretationKey = '';

	let deckPreloadIndex = 0;
	let deckPreloadTimer: ReturnType<typeof setTimeout> | null = null;
	let hasStartedDeckPreload = false;
	let isDeckPreloadInFlight = false;

	const DECK_PRELOAD_START_DELAY_MS = 1000;
	const DECK_PRELOAD_STEP_DELAY_MS = 120;

	onMount(() => {
		void preloadCardBackImage();

		const startDeckPreload = () => {
			hasStartedDeckPreload = true;
			void preloadDeckImages();
		};

		// Starta hela kortleken först när sidan är lugn.
		if ('requestIdleCallback' in window) {
			const idleId = window.requestIdleCallback(
				() => {
					startDeckPreload();
				},
				{ timeout: DECK_PRELOAD_START_DELAY_MS }
			);

			return () => {
				window.cancelIdleCallback(idleId);
				if (deckPreloadTimer) clearTimeout(deckPreloadTimer);
			};
		}

		deckPreloadTimer = setTimeout(() => {
			deckPreloadTimer = null;
			startDeckPreload();
		}, DECK_PRELOAD_START_DELAY_MS);

		return () => {
			if (deckPreloadTimer) clearTimeout(deckPreloadTimer);
		};
	});

	const DEAL_DELAY_MS = 160;

	function scheduleNextDeckPreload() {
		if (deckPreloadTimer) clearTimeout(deckPreloadTimer);
		deckPreloadTimer = setTimeout(() => {
			deckPreloadTimer = null;
			void preloadDeckImages();
		}, DECK_PRELOAD_STEP_DELAY_MS);
	}

	async function preloadDeckImages() {
		if (isDealing || isDeckPreloadInFlight || deckPreloadIndex >= tarotDeck.length) return;

		const card = tarotDeck[deckPreloadIndex];
		const img = new Image();
		img.decoding = 'async';
		img.fetchPriority = 'low';
		isDeckPreloadInFlight = true;

		const advance = () => {
			isDeckPreloadInFlight = false;
			deckPreloadIndex += 1;
			scheduleNextDeckPreload();
		};

		img.onload = advance;
		img.onerror = advance;
		img.src = `${base}/tarot/cards/${card.image}`;
	}

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function preloadCards(cards: TarotCardData[]): Promise<void> {
		await Promise.all(
			cards.map(
				(card) =>
					new Promise<void>((resolve) => {
						const img = new Image();
						let isSettled = false;
						img.fetchPriority = 'high';
						img.decoding = 'sync';

						const finalize = async () => {
							if (isSettled) return;
							isSettled = true;

							try {
								await img.decode();
							} catch {}
							resolve();
						};

						img.onload = () => {
							void finalize();
						};
						img.onerror = () => {
							if (isSettled) return;
							isSettled = true;
							resolve();
						};
						img.src = `${base}/tarot/cards/${card.image}`;

						if (img.complete) {
							void finalize();
						}
					})
			)
		);
	}

	function updateReadyState() {
		const totalCards = $tarotSession.selectedCards.length;
		isReady = totalCards > 0 && dealtIds.size === totalCards && imageReadyIds.size === totalCards;

		if (isReady) {
			isDealing = false;

			// 🔥 vibration (om device stödjer det)
			if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
				navigator.vibrate(20);
			}
		}
	}

	function startTyping(text: string) {
		if (typingInterval) {
			clearInterval(typingInterval);
		}

		displayedInterpretation = '';
		let index = 0;

		typingInterval = setInterval(() => {
			if (index < text.length) {
				displayedInterpretation += text[index];
				index++;
			} else {
				clearInterval(typingInterval!);
				typingInterval = null;
			}
		}, 15);
	}

	function stopTyping() {
		if (typingInterval) {
			clearInterval(typingInterval);
			typingInterval = null;
		}
	}

	function getInterpretationKey(
		lang: 'sv' | 'en' = $language ?? 'sv',
		selectedMode: TarotMode = $tarotSession.mode ?? 'soft'
	) {
		return [
			$tarotSession.drawId,
			lang,
			selectedMode,
			$tarotSession.question.trim(),
			$tarotSession.selectedCards.map((card) => card.id).join(',')
		].join('|');
	}

	function clearInterpretationState() {
		stopTyping();
		$tarotSession.interpretation = '';
		displayedInterpretation = '';
		error = '';
	}

	function showCachedInterpretation(cachedInterpretation: string, key: string) {
		error = '';
		isLoading = false;
		failedInterpretationKey = '';
		loadedInterpretationKey = key;
		$tarotSession.interpretation = cachedInterpretation;
		startTyping(cachedInterpretation);
	}

	$: t = translations[$language ?? 'sv'];
	$: hasSelectedMode = $tarotSession.mode !== null;
	$: if ($tarotSession.interpretation && !displayedInterpretation && !isLoading) {
		displayedInterpretation = $tarotSession.interpretation;
	}

	$: visibleQuestions = t.questions[cardCount].slice(0, 3);

	// If a suggestion is selected, keep the question synced with
	// the current language and spread size (same index, new text)
	$: if (selectedSuggestionIndex !== null) {
		$tarotSession.question = t.questions[cardCount][selectedSuggestionIndex];
	}

	$: if (cardCount !== previousCardCount) {
		// If the spread size changes and the question was auto-filled,
		// clear it to avoid mismatched spread/question context
		if (selectedSuggestionIndex !== null) {
			$tarotSession.question = '';
			selectedSuggestionIndex = null;
		}
		scrollQuestionIndex = 0;
		previousCardCount = cardCount;
	}

	// Removed reactive block for allCardsFlipped && !isLoading && hasDrawn && hasFetched

	function resetDraw() {
		stopTyping();
		$tarotSession = createTarotSession();
		selectedSuggestionIndex = null;
		scrollQuestionIndex = 0;
		isDealing = false;
		isReady = false;
		dealtIds = new Set<string>();
		imageReadyIds = new Set<string>();
		error = '';
		isLoading = false;
		activeFetchKey = '';
		loadedInterpretationKey = '';
		failedInterpretationKey = '';
		displayedInterpretation = '';
	}

	function handleFlipChange(payload: { id: string; isFlipped: boolean }) {
		if (!isReady || isDealing) return;

		const next = new Set($tarotSession.flippedIds);

		if (payload.isFlipped) {
			next.add(payload.id);
		} else {
			next.delete(payload.id);
		}

		$tarotSession.flippedIds = next;
	}

	$: allCardsFlipped =
		$tarotSession.selectedCards.length > 0 &&
		$tarotSession.flippedIds.size === $tarotSession.selectedCards.length;

	$: if (allCardsFlipped && $tarotSession.hasDrawn && hasSelectedMode) {
		const lang = $language ?? 'sv';
		const selectedMode = $tarotSession.mode ?? 'soft';
		const interpretationKey = getInterpretationKey(lang, selectedMode);
		const cachedInterpretation = $tarotSession.mode
			? $tarotSession.interpretationCache[lang]?.[$tarotSession.mode]
			: undefined;

		if (cachedInterpretation) {
			if ($tarotSession.interpretation === cachedInterpretation) {
				loadedInterpretationKey = interpretationKey;
				failedInterpretationKey = '';
			} else if (
				loadedInterpretationKey !== interpretationKey ||
				$tarotSession.interpretation !== cachedInterpretation
			) {
				showCachedInterpretation(cachedInterpretation, interpretationKey);
			}
		} else if (loadedInterpretationKey === interpretationKey) {
			clearInterpretationState();
			loadedInterpretationKey = '';
		} else if (
			failedInterpretationKey !== interpretationKey &&
			activeFetchKey !== interpretationKey
		) {
			fetchInterpretation(interpretationKey, lang, selectedMode);
		}
	}

	async function newCards() {
		if (isDealing) return;

		// reset
		$tarotSession.selectedCards = [];
		$tarotSession.flippedIds = new Set<string>();
		$tarotSession.hasDrawn = false;
		isDealing = true;
		$tarotSession.drawId++;
		dealtIds = new Set<string>();
		imageReadyIds = new Set<string>();
		isReady = false;

		// skapa nytt kort
		const deckCopy = [...tarotDeck];
		const returnSelected: TarotCardData[] = [];

		while (returnSelected.length < cardCount && deckCopy.length > 0) {
			const randomIndex = Math.floor(Math.random() * deckCopy.length);

			// plocka kortet
			const [card] = deckCopy.splice(randomIndex, 1);

			// lägg i selectedCards
			returnSelected.push(card);
		}
		// Start preloading in parallel (do not block dealing)
		preloadCards(returnSelected);

		for (const card of returnSelected) {
			$tarotSession.selectedCards = [...$tarotSession.selectedCards, card];
			await wait(DEAL_DELAY_MS);
		}

		$tarotSession.hasDrawn = true;
		// isDealing sätts när alla kort är klara
	}

	function handleCardDealt(event: CustomEvent<{ id: string }>) {
		const id = event.detail.id;

		const next = new Set(dealtIds);
		next.add(id);
		dealtIds = next;
		updateReadyState();
	}

	function handleCardImageReady(event: CustomEvent<{ id: string }>) {
		const id = event.detail.id;

		const next = new Set(imageReadyIds);
		next.add(id);
		imageReadyIds = next;
		updateReadyState();
	}

	$: if (
		hasStartedDeckPreload &&
		!isDealing &&
		!isDeckPreloadInFlight &&
		deckPreloadIndex < tarotDeck.length &&
		!deckPreloadTimer
	) {
		scheduleNextDeckPreload();
	}

	function selectMode(selected: TarotMode) {
		$tarotSession.mode = selected;

		const lang = $language ?? 'sv';
		const interpretationKey = getInterpretationKey(lang, selected);
		const cachedInterpretation = $tarotSession.interpretationCache[lang]?.[selected];

		if (cachedInterpretation) {
			showCachedInterpretation(cachedInterpretation, interpretationKey);
			return;
		}

		if (loadedInterpretationKey !== interpretationKey) {
			clearInterpretationState();
		}
	}

	async function fetchInterpretation(
		interpretationKey = getInterpretationKey(),
		lang: 'sv' | 'en' = $language ?? 'sv',
		selectedMode: TarotMode = $tarotSession.mode ?? 'soft'
	) {
		if (!$tarotSession.question.trim() || $tarotSession.selectedCards.length === 0) return;
		if (!hasSelectedMode) return;
		if (activeFetchKey === interpretationKey || failedInterpretationKey === interpretationKey)
			return;

		try {
			activeFetchKey = interpretationKey;
			isLoading = true;
			error = '';
			if (loadedInterpretationKey !== interpretationKey) {
				stopTyping();
				$tarotSession.interpretation = '';
				displayedInterpretation = '';
			}

			const result = await interpretTarot({
				question: $tarotSession.question,
				cards: $tarotSession.selectedCards.map((c) => c.shortName),
				language: lang,
				mode: selectedMode
			});

			if (activeFetchKey !== interpretationKey) {
				return;
			}

			const nextInterpretation = result?.interpretation?.trim() ?? '';

			if (!nextInterpretation) {
				throw new Error('No interpretation returned');
			}

			$tarotSession.interpretationCache = {
				...$tarotSession.interpretationCache,
				[lang]: {
					...$tarotSession.interpretationCache[lang],
					[selectedMode]: nextInterpretation
				}
			};
			$tarotSession.interpretation = nextInterpretation;
			loadedInterpretationKey = interpretationKey;
			failedInterpretationKey = '';
			startTyping(nextInterpretation);
			setTimeout(() => {
				document.querySelector('.prompt')?.scrollIntoView({ behavior: 'smooth' });
			}, 50);
		} catch (err) {
			if (activeFetchKey !== interpretationKey) {
				return;
			}

			stopTyping();
			displayedInterpretation = '';
			error = err instanceof Error ? err.message : 'Something went wrong';
			$tarotSession.interpretation = '';
			loadedInterpretationKey = '';
			failedInterpretationKey = interpretationKey;
			return;
		} finally {
			if (activeFetchKey === interpretationKey) {
				isLoading = false;
				activeFetchKey = '';
			}
		}
	}
</script>

<div class="page-wrapper">
	<div class="app">
		<header class="header">
			<h1>{t.page.title}</h1>

			<div class="status">
				{#if !$tarotSession.hasDrawn}
					<p class="intro">{t.page.intro}</p>
				{:else}
					<p class="progress">
						{t.page.progress($tarotSession.flippedIds.size, $tarotSession.selectedCards.length)}
					</p>
				{/if}
			</div>
		</header>

		<section class="cards" class:dealing={isDealing}>
			{#if !$tarotSession.hasDrawn && !isDealing}
				<div class="veil-slot">
					<div class="theVeil">
						<img src={`${base}/tarot/${guideImage}`} alt="Tarotkort – vägledning" />
					</div>
				</div>
			{:else if $tarotSession.selectedCards.length > 0}
				{#each $tarotSession.selectedCards as card (`${$tarotSession.drawId}-${card.id}`)}
					<TarotCard
						{card}
						isFlipped={$tarotSession.flippedIds.has(card.id)}
						isInteractive={isReady}
						{isReady}
						onFlipChange={handleFlipChange}
						on:dealt={handleCardDealt}
						on:imageready={handleCardImageReady}
					/>
				{/each}
			{/if}
		</section>

		<section class="controls">
			<div class="control-inner">
				<div class="question">
					{#if !$tarotSession.hasDrawn && !isDealing}
						<div class="card-count">
							<label>
								<input type="radio" bind:group={cardCount} value={1} disabled={isDealing} />
								{t.page.cardCountLabel(1)}
							</label>

							<label>
								<input type="radio" bind:group={cardCount} value={2} disabled={isDealing} />
								{t.page.cardCountLabel(2)}
							</label>

							<label>
								<input type="radio" bind:group={cardCount} value={3} disabled={isDealing} />
								{t.page.cardCountLabel(3)}
							</label>
						</div>
					{/if}

					<label>
						<span>{t.page.questionLabel}</span>
						<textarea
							bind:value={$tarotSession.question}
							on:input={() => {
								selectedSuggestionIndex = null;
							}}
							placeholder={t.page.questionPlaceholder}
							disabled={$tarotSession.hasDrawn || isDealing}
						></textarea>
					</label>
					{#if !$tarotSession.hasDrawn && !isDealing}
						<div class="suggestions">
							<TarotScroll
								questions={visibleQuestions}
								currentIndex={scrollQuestionIndex}
								title={$language === 'sv' ? 'En fråga att utforska' : 'Choose a thread to follow'}
								hint={$language === 'sv'
									? 'Svep eller bläddra, tryck för att välja'
									: 'Swipe or turn, tap to choose'}
								ariaLabel={$language === 'sv'
									? 'Interaktiv tarotrulle med frågor'
									: 'Interactive tarot scroll of questions'}
								on:change={(event) => {
									scrollQuestionIndex = event.detail.index;
								}}
								on:select={(event) => {
									$tarotSession.question = event.detail.question;
									scrollQuestionIndex = event.detail.index;
									selectedSuggestionIndex = event.detail.index;
								}}
							/>
						</div>
					{/if}
				</div>
				{#if !$tarotSession.hasDrawn}
					<Button on:click={newCards} disabled={!$tarotSession.question.trim() || isDealing}>
						{t.page.drawButton(cardCount)}
					</Button>
				{:else}
					<Button variant="ghost" on:click={resetDraw}>
						{t.page.resetButton}
					</Button>
				{/if}

				<div class="secondary-actions">
					<Button variant="subtle" on:click={() => goto('/deck')}>
						{t.page.deckButton}
					</Button>
				</div>
			</div>
		</section>
		{#if allCardsFlipped}
			<section class="prompt">
				<div class="mode-select">
					<p>{t.page.modeLabel}</p>

					<div class="mode-buttons">
						<Button
							on:click={() => selectMode('soft')}
							disabled={isLoading}
							variant={$tarotSession.mode === 'soft' && hasSelectedMode ? 'primary' : 'ghost'}
						>
							😇 {t.page.modeSoft}
						</Button>

						<Button
							on:click={() => selectMode('direct')}
							disabled={isLoading}
							variant={$tarotSession.mode === 'direct' && hasSelectedMode ? 'primary' : 'ghost'}
						>
							😈 {t.page.modeDirect}
						</Button>
					</div>
				</div>

				{#if isLoading && !$tarotSession.interpretation && !error}
					<p class="loading">Läser av korten...</p>
				{/if}

				{#if $tarotSession.interpretation && !error}
					<TarotInterpretation
						interpretation={$tarotSession.interpretation}
						{displayedInterpretation}
						mode={$tarotSession.mode ?? undefined}
					/>
				{:else if error}
					<TarotPrompt
						cards={$tarotSession.selectedCards}
						question={$tarotSession.question}
						mode={$tarotSession.mode ?? undefined}
					/>
				{/if}
			</section>
		{/if}
	</div>
</div>

<style lang="scss">
	/*prevent mobile overflow*/
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	.page-wrapper {
		position: relative;
		min-height: 100vh;
		width: 100%;
	}

	.page-wrapper::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(circle at center, transparent 65%, rgba(0, 0, 0, 0.08) 100%);
		z-index: 0;
	}

	.status {
		min-height: 1.5rem;
		text-align: center;
	}

	.status p {
		transition: opacity 0.2s ease;
	}

	.intro {
		font-size: 0.9rem;
		color: var(--muted-color);
	}

	.progress {
		text-align: center;
		font-size: 0.85rem;
		color: var(--muted-color);
	}

	.app {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.header {
		position: relative;
		text-align: center;
	}

	.header h1 {
		color: var(--text-color);
		font-size: 1.8rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.theVeil {
		width: 230px;
		aspect-ratio: 2 / 3;

		display: flex;
		justify-content: center;
		align-items: center;

		animation: veil-float 18s linear infinite;
		filter: drop-shadow(0 16px 30px rgba(0, 0, 0, 0.38)) drop-shadow(0 40px 80px rgba(0, 0, 0, 0.3));

		transform-style: preserve-3d;
	}

	@media (max-width: 600px) {
		.theVeil {
			width: 80vw;
			max-width: 260px;

			filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.32))
				drop-shadow(0 24px 48px rgba(0, 0, 0, 0.22));
		}
	}

	@keyframes veil-float {
		0% {
			transform: rotateZ(0deg) rotateX(1.5deg);
		}
		25% {
			transform: rotateZ(-1.2deg) rotateX(2deg);
		}
		50% {
			transform: rotateZ(0.3deg) rotateX(1.6deg);
		}
		75% {
			transform: rotateZ(1.2deg) rotateX(2deg);
		}
		100% {
			transform: rotateZ(0deg) rotateX(1.5deg);
		}
	}

	.veil-slot {
		display: flex;
		justify-content: center;
	}

	.theVeil img {
		width: 100%;
		height: 100%;
		object-fit: cover;

		opacity: 0.95;
		border-radius: 12px;
		box-shadow: inset 0 0 0 1px var(--card-border);
	}

	.cards {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	@media (max-width: 600px) {
		.cards {
			gap: 1rem;
		}
	}
	.card-count {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.card-count label {
		padding: 0.35rem 0.6rem;
		border-radius: 8px;
		transition: background 0.2s ease;
	}

	.card-count label:hover {
		background: var(--surface-color);
		cursor: pointer;
	}

	.card-count input[type='radio'] {
		accent-color: var(--accent-light);
		cursor: pointer;
	}

	.controls {
		display: flex;
		justify-content: center;
	}

	.cards.dealing {
		pointer-events: none;
		cursor: progress;
	}

	.cards.dealing :global(.card) {
		opacity: 0.85;
		transform: scale(0.98);
	}

	.control-inner {
		width: 100%;
		max-width: 420px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.controls button {
		width: 100%;
		max-width: 420px;
	}

	.secondary-actions {
		display: flex;
		justify-content: center;
		margin-top: -0.1rem;
	}

	.secondary-actions :global(button) {
		max-width: 220px;
	}

	.question {
		width: 100%;
		max-width: 420px;
		text-align: left;
	}

	.question textarea {
		width: 100%;
		min-height: 60px;
		box-sizing: border-box;
		font-size: 16px;

		background: var(--surface-color);
		border: 1px solid var(--muted-color);
		color: var(--text-color);
		border-radius: 8px;
		padding: 0.5rem;
	}

	.suggestions {
		margin-top: 0.85rem;
	}

	.prompt {
		margin-top: 2rem;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
		width: 100%;
	}
	.loading {
		text-align: center;
		font-size: 0.9rem;
		color: var(--muted-color);
		margin-bottom: 0.5rem;
	}
	.mode-select {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.mode-buttons {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	.mode-buttons button {
		flex: 1;
		max-width: 180px;
	}

	.mode-buttons button.active {
		outline: 1px solid var(--accent-light);
		background: var(--surface-color);
	}
</style>
