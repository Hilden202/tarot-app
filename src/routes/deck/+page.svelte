<script lang="ts">
	import { tarotDeck } from '$lib/data/tarotDeck';
	import { base } from '$app/paths';
</script>

<h1>Kortlek</h1>

<p>Antal kort: {tarotDeck.length}</p>

{#each ['Major', 'Cups', 'Wands', 'Swords', 'Stones'] as section}
	<h2 class="section-title">{section}</h2>

	<div class="deck-grid">
		{#each tarotDeck.filter(card => 
			section === 'Major'
				? card.arcana === 'Major'
				: card.suit === section
		) as card}
			<div class="card-item">
				<img
					src={`${base}/tarot/cards/${card.image}`}
					alt={card.fullTitle}
				/>
				<div class="card-title">{card.shortName}</div>
			</div>
		{/each}
	</div>
{/each}

<style>
	.section-title {
		margin-top: 2rem;
		margin-bottom: 0.5rem;
		font-size: 1.2rem;
		opacity: 0.8;
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
		box-shadow: 0 4px 12px rgba(0,0,0,0.2);
	}

	.card-title {
		font-size: 0.8rem;
		text-align: center;
		opacity: 0.8;
	}
</style>