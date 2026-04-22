<script lang="ts">
	import type { TarotCardData } from '$lib/data/tarotDeck';
	import { base } from '$app/paths';
	import { createEventDispatcher } from 'svelte';

	export let card: TarotCardData;
	export let isInteractive = true;

	export let onFlipChange: (payload: { id: string; isFlipped: boolean }) => void = () => {};

	const dispatch = createEventDispatcher();

	let isFlipped = false;

	const backImage = 'back/TarotKort_Baksida.png';
	function flipCard() {
		if (!isInteractive) return;

		isFlipped = !isFlipped;

		onFlipChange({
			id: card.id,
			isFlipped
		});
	}

	function handleAnimationEnd() {
		// notify parent that this card finished its deal animation
		dispatch('dealt', { id: card.id });
	}
</script>

<button
	class="card"
	class:flipped={isFlipped}
	class:nonInteractive={!isInteractive}
	on:click={flipCard}
	on:animationend={handleAnimationEnd}
>
	<!-- Baksida -->
	<div class="backCard">
		<img src={`${base}/tarot/${backImage}`} alt="Tarotkort – baksida" />
	</div>

	<!-- Framsida -->
	<div class="frontCard">
		<img
			src={`${base}/tarot/cards/${card.image}`}
			alt={card.fullTitle}
			loading="eager"
			decoding="async"
		/>
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

	.card.nonInteractive {
		cursor: default;
		opacity: 0.85;
		transform: scale(0.96);
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

	.card {
		transition:
			transform 0.25s ease,
			filter 0.25s ease;
	}

	.card:active {
		transform: scale(0.98);
		filter: brightness(0.95);
	}

	.card {
		animation: dealIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes dealIn {
		0% {
			opacity: 0;
			transform: translateY(30px) scale(0.92);
		}
		60% {
			opacity: 1;
			transform: translateY(-6px) scale(1.04);
		}
		80% {
			transform: translateY(2px) scale(0.98);
		}
		100% {
			transform: translateY(0) scale(1);
		}
	}
</style>
