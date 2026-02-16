<script lang="ts">
	import type { TarotCardData } from '$lib/data/tarotDeck';
	import { base } from '$app/paths';

	export let card: TarotCardData;

	export let onFlipChange: (payload: { id: string; isFlipped: boolean }) => void = () => {};

	let isFlipped = false;

	const backImage = 'back/TarotKort_Baksida.png';
	function flipCard() {
		isFlipped = !isFlipped;

		onFlipChange({
			id: card.id,
			isFlipped
		});
	}
</script>

<button class="card" class:flipped={isFlipped} on:click={flipCard}>
	<!-- Baksida -->
	<div class="backCard">
		<img src={`${base}/tarot/${backImage}`} alt="Tarotkort – baksida" />
	</div>

	<!-- Framsida -->
	<div class="frontCard">
		<img src={`${base}/tarot/cards/${card.image}`} alt={card.fullTitle} />
	</div>
</button>

<style lang="scss">
	.card {
		width: min(28vw, 230px); /* desktop */
		aspect-ratio: 2 / 3; /* ersätter height */
		position: relative;
		perspective: 1000px;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.35))
			drop-shadow(0 30px 60px rgba(0, 0, 0, 0.25));
	}

	@media (max-width: 600px) {
		.card {
			width: 80vw;
			max-width: 260px;

			filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
		}
	}

	.card > div {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		transition: transform 0.6s ease;
		border-radius: 12px;
		overflow: hidden;
		box-shadow:
			inset 0 0 0 1px var(--card-border),
			inset 0 -20px 40px rgba(0, 0, 0, 0.15);
	}

	.backCard {
		transform: rotateY(0deg);
	}

	.frontCard {
		transform: rotateY(180deg);
	}

	.card.flipped .backCard {
		transform: rotateY(-180deg);
	}

	.card.flipped .frontCard {
		transform: rotateY(0deg);
	}

	.backCard img,
	.frontCard img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
