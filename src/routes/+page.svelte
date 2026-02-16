<script lang="ts">
	import TarotCard from '$lib/components/TarotCard.svelte';
	import TarotPrompt from '$lib/components/TarotPrompt.svelte';
	import { tarotDeck } from '$lib/data/tarotDeck';
	import Button from '$lib/components/Button.svelte';
	import type { TarotCardData } from '$lib/data/tarotDeck';
	import { base } from '$app/paths';

	const guideImage = 'intro/the_veil.png';

	let theme: 'clean' | 'soul' = 'clean';

	let selectedCards: TarotCardData[] = [];

	let allCardsFlipped: boolean = false;
	let flippedIds = new Set<string>();

	let question = '';

	let drawId = 0;

	let cardCount = 3;

	let hasDrawn = false;

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

<div class="page-wrapper" data-theme={theme}>
	<div class="app">
		<header class="header">
			<button class="theme-toggle" on:click={() => (theme = theme === 'clean' ? 'soul' : 'clean')}>
				{theme === 'clean' ? '🌙' : '☀️'}
			</button>

			<h1>Tarotläggning</h1>

			<div class="status">
				{#if !hasDrawn}
					<p class="intro">Ta ett ögonblick, formulera en fråga och dra dina kort.</p>
				{:else}
					<p class="progress">
						{flippedIds.size} / {selectedCards.length} kort uppvända
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
							1 kort
						</label>

						<label>
							<input type="radio" bind:group={cardCount} value={2} />
							2 kort
						</label>

						<label>
							<input type="radio" bind:group={cardCount} value={3} />
							3 kort
						</label>
					</div>
				{/if}

				<label>
					<span>Din fråga:</span>
					<textarea
						bind:value={question}
						placeholder="Vad vill du få vägledning kring just nu?"
						disabled={hasDrawn}
					/>
				</label>
			</div>

			{#if !hasDrawn}
				<Button on:click={newCards} disabled={!question.trim()}>
					Dra {cardCount} kort
				</Button>
			{:else}
				<Button variant="ghost" on:click={resetDraw}>Ny dragning</Button>
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
		background-color: var(--bg-color);
		min-height: 100vh;
		transition:
			background 0.4s ease,
			color 0.4s ease;
	}

	/* 🌿 TEMA 1 – CLEAN */
	.page-wrapper[data-theme='clean'] {
		--bg-color: #f5efe6;
		--text-color: #2f2a25;
		--muted-color: #6b6258;
		--accent-color: #3e5f5b;
		--surface-color: #ffffff;
		--card-border: rgba(0, 0, 0, 0.08);
		--accent-color: #3e5f5b;
		--accent-light: #4f7570;
		--accent-dark: #2f4b48;
		--accent-text: #f5efe6;
		--accent-text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);

		background: var(--bg-color);
		color: var(--text-color);
	}

	.page-wrapper[data-theme='clean'] .prompt > * {
		background: #ffffff;
	}

	/* 🔥 TEMA 2 – SOUL */
	.page-wrapper[data-theme='soul'] {
		--bg-color: #121a1b;
		--text-color: #e8e2d8;
		--muted-color: #b7ada1;
		--accent-color: #c2a45d;
		--surface-color: rgba(255, 255, 255, 0.06);
		--card-border: rgba(255, 255, 255, 0.08);
		--accent-color: #c2a45d;
		--accent-light: #d8bb73;
		--accent-dark: #a88d4e;
		--accent-text: #121a1b;
		--accent-text-shadow: 0 1px 2px rgba(255, 255, 255, 0.25);

		background: radial-gradient(circle at top center, #1c2626 0%, #121a1b 60%, #0e1415 100%);
		color: var(--text-color);
	}

	.theme-toggle {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: transparent;
		border: 1px solid var(--muted-color);
		color: var(--text-color);
		padding: 0.3rem 0.6rem;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.theme-toggle:hover {
		background: var(--accent-color);
		color: var(--bg-color);
	}

	.status {
		min-height: 1.5rem; /* exakt 1 textrad */
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
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		text-align: left;
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
