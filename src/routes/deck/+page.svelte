<script lang="ts">
	import { tarotDeck } from '$lib/data/tarotDeck';
	import type { TarotCardData } from '$lib/data/tarotDeck';
	import { base } from '$app/paths';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/i18n/translations';

	const sections = [
		{ id: 'major', arcana: 'Major' },
		{ id: 'cups', suit: 'Cups' },
		{ id: 'wands', suit: 'Wands' },
		{ id: 'swords', suit: 'Swords' },
		{ id: 'stones', suit: 'Stones' }
	] as const;

	$: t = translations[$language ?? 'sv'];
	let selectedCard: TarotCardData | null = null;
</script>

<div class="deck-header">
	<button class="back-button" on:click={() => history.back()}>
		<span aria-hidden="true">←</span>
		{t.deck.backButton}
	</button>

	<h1>{t.deck.title}</h1>
</div>
<p class="wip-note">
	{t.deck.wipNote}
</p>

<p class="card-count">{t.deck.cardCount(tarotDeck.length)}</p>

{#each sections as section}
	<section class="deck-section">
		<h2 class="section-title">{t.deck.sections[section.id]}</h2>

		<div class="deck-grid">
			{#each tarotDeck.filter( (card) => ('arcana' in section ? card.arcana === section.arcana : card.suit === section.suit) ) as card}
				<div class="card-item" on:click={() => selectedCard = selectedCard?.id === card.id ? null : card}>
					<img src={`${base}/tarot/cards/${card.image}`} alt={card.fullTitle} />
					<div class="card-title">{card.shortName}</div>
				</div>
			{/each}
		</div>
	</section>
{/each}

{#if selectedCard}
	<div class="modal-overlay" on:click={() => selectedCard = null}>
		<div class="modal" on:click={() => selectedCard = null}>
			<img src={`${base}/tarot/cards/${selectedCard.image}`} alt={selectedCard.fullTitle} />
			<div class="modal-info">
				<h2>{selectedCard.fullTitle}</h2>
				<p>{selectedCard.keywords?.join(', ')}</p>
				<p>{selectedCard.element}</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.deck-header {
		display: grid;
		grid-template-columns: minmax(6rem, 1fr) auto minmax(6rem, 1fr);
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.back-button {
		justify-self: start;
		background: transparent;
		border: none;
		color: inherit;
		font-size: 0.9rem;
		opacity: 0.7;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	.back-button:hover {
		opacity: 1;
	}

	h1 {
		margin: 0;
		text-align: center;
	}

	.wip-note {
		font-size: 0.9rem;
		opacity: 0.7;
		margin-bottom: 1rem;
		text-align: center;
	}

	.card-count {
		margin: 0 0 1.5rem;
		text-align: center;
		opacity: 0.8;
	}

	.deck-section {
		margin-top: 2.5rem;
	}

	.section-title {
		margin: 0 0 0.75rem;
		font-size: 1.25rem;
		font-weight: 650;
		opacity: 0.9;
	}

	.deck-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.card-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		transition: transform 0.15s ease;
	}

	.card-item:hover {
		transform: scale(1.03);
	}

	.card-item img {
		width: 100%;
		border-radius: 10px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.card-title {
		font-size: 0.8rem;
		text-align: center;
		opacity: 0.8;
	}

	@media (max-width: 520px) {
		.deck-header {
			grid-template-columns: 1fr;
			justify-items: center;
			gap: 0.5rem;
		}

		.back-button {
			justify-self: start;
		}
	}
.modal-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(6px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modal {
	display: grid;
	grid-template-columns: 300px 1fr;
	gap: 2rem;
	background: rgba(20, 20, 30, 0.95);
	padding: 2rem;
	border-radius: 16px;
	max-width: 90vw;
	max-height: 90vh;
	overflow-y: auto;
	box-shadow:
		0 20px 60px rgba(0, 0, 0, 0.6),
		0 0 40px rgba(120, 100, 255, 0.2);
}

.modal img {
	width: 100%;
	border-radius: 12px;
}

.modal-info h2 {
	margin-top: 0;
}

@media (max-width: 700px) {
	.modal {
		grid-template-columns: 1fr;
	}
}
</style>