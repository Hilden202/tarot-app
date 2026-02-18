<script lang="ts">
	import TarotCard from '$lib/components/TarotCard.svelte';
	import TarotPrompt from '$lib/components/TarotPrompt.svelte';
	import { tarotDeck } from '$lib/data/tarotDeck';
	import Button from '$lib/components/Button.svelte';
	import type { TarotCardData } from '$lib/data/tarotDeck';
	import { base } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/i18n/translations';

	const guideImage = 'intro/the_veil.png';

	let t;

	let selectedCards: TarotCardData[] = [];

	let allCardsFlipped: boolean = false;
	let flippedIds = new Set<string>();

	let question = '';

	let drawId = 0;

	let cardCount = 3;

	let hasDrawn = false;

	$: t = translations[$language ?? 'sv'];

	function resetDraw() {
		selectedCards = [];
		flippedIds = new Set<string>();
		question = '';
		hasDrawn = false;
	}

	function handleFlipChange(payload: { id: string; isFlipped: boolean }) {
		const next = new Set(flippedIds);

		if (payload.isFlipped) {
			next.add(payload.id);
		} else {
			next.delete(payload.id);
		}

		flippedIds = next;
	}

	$: allCardsFlipped = selectedCards.length > 0 && flippedIds.size === selectedCards.length;

	function newCards() {
		// reset
		flippedIds = new Set<string>();
		drawId++;

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
		// ersätt
		selectedCards = returnSelected;
		hasDrawn = true;
	}
</script>

<div class="page-wrapper">
	<div class="app">
		<header class="header">
			<h1>{t.page.title}</h1>

			<div class="status">
				{#if !hasDrawn}
					<p class="intro">{t.page.intro}</p>
				{:else}
					<p class="progress">
						{t.page.progress(flippedIds.size, selectedCards.length)}
					</p>
				{/if}
			</div>
		</header>

		<section class="cards">
			{#if !hasDrawn}
				<div class="veil-slot">
					<div class="theVeil">
						<img src={`${base}/tarot/${guideImage}`} alt="Tarotkort – vägledning" />
					</div>
				</div>
			{:else}
				{#each selectedCards as card (`${drawId}-${card.id}`)}
					<TarotCard {card} onFlipChange={handleFlipChange} />
				{/each}
			{/if}
		</section>

		<section class="controls">
			<div class="question">
				{#if !hasDrawn}
					<div class="card-count">
						<label>
							<input type="radio" bind:group={cardCount} value={1} />
							{t.page.cardCountLabel(1)}
						</label>

						<label>
							<input type="radio" bind:group={cardCount} value={2} />
							{t.page.cardCountLabel(2)}
						</label>

						<label>
							<input type="radio" bind:group={cardCount} value={3} />
							{t.page.cardCountLabel(3)}
						</label>
					</div>
				{/if}

				<label>
					<span>{t.page.questionLabel}</span>
					<textarea
						bind:value={question}
						placeholder={t.page.questionPlaceholder}
						disabled={hasDrawn}
					/>
				</label>
			</div>
			{#if !hasDrawn}
				<Button on:click={newCards} disabled={!question.trim()}>
					{t.page.drawButton(cardCount)}
				</Button>
			{:else}
				<Button variant="ghost" on:click={resetDraw}>
					{t.page.resetButton}
				</Button>
			{/if}
		</section>

		{#if allCardsFlipped}
			<section class="prompt">
				<TarotPrompt {question} cards={selectedCards} />
			</section>
		{/if}
	</div>
</div>

<style lang="scss">
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
		width: min(28vw, 230px);
		aspect-ratio: 2 / 3;

		display: flex;
		justify-content: center;
		align-items: center;

		animation: veil-float 18s linear infinite;
		filter: drop-shadow(0 16px 30px rgba(0, 0, 0, 0.38)) drop-shadow(0 40px 80px rgba(0, 0, 0, 0.3));

		transform-style: preserve-3d;
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

	.card-count {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.card-count label {
		display: flex;
		gap: 0.25rem;
		align-items: center;
		font-size: 0.9rem;
	}

	.controls {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		gap: 1rem;
	}

	@media (max-width: 600px) {
		.controls {
			flex-direction: column;
			align-items: stretch;
		}

		.controls button {
			width: 100%;
			max-width: 420px;
			align-self: center;
		}
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

	.prompt {
		margin-top: 2rem;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	.prompt > * {
		background: var(--surface-color);
		border-radius: 12px;
	}

	@media (max-width: 600px) {
		.cards {
			gap: 1rem;
		}
	}

	@media (max-width: 600px) {
		.theVeil {
			width: 80vw;
			max-width: 260px;

			filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.32))
				drop-shadow(0 24px 48px rgba(0, 0, 0, 0.22));
		}
	}
</style>
