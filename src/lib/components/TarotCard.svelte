<script lang="ts">
	import type { TarotCardData } from '$lib/data/tarotDeck';
	import { base } from '$app/paths';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { cardBackImageSrc, preloadCardBackImage } from '$lib/images/cardBack';

	export let card: TarotCardData;
	export let isInteractive = true;

	export let onFlipChange: (payload: { id: string; isFlipped: boolean }) => void = () => {};
	export let isReady = false;

	const dispatch = createEventDispatcher<{
		dealt: { id: string };
		imageready: { id: string };
	}>();

	let isFlipped = false;
	let frontImageEl: HTMLImageElement | null = null;
	let isImageReady = false;

	function flipCard() {
		if (!isInteractive || !isImageReady) return;

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

	async function markImageReady() {
		if (isImageReady || !frontImageEl || !frontImageEl.complete) return;

		try {
			await frontImageEl.decode();
		} catch {
			// Some browsers may reject decode() for already decoded images.
		}

		isImageReady = true;
		dispatch('imageready', { id: card.id });
	}

	onMount(async () => {
		void preloadCardBackImage();
		await tick();
		void markImageReady();
	});
</script>

<button
	class="card"
	class:flipped={isFlipped}
	class:nonInteractive={!isInteractive}
	class:imageReady={isImageReady}
	class:ready={isReady}
	on:click={flipCard}
	on:animationend={handleAnimationEnd}
>
	<!-- Baksida -->
	<div class="backCard">
		<img src={cardBackImageSrc} alt="Tarotkort – baksida" loading="eager" decoding="sync" />
	</div>

	<!-- Framsida -->
	<div class="frontCard">
		<img
			bind:this={frontImageEl}
			src={`${base}/tarot/cards/${card.image}`}
			alt={card.fullTitle}
			loading="eager"
			decoding="sync"
			on:load={markImageReady}
		/>
	</div>

	<div class="prewarmLayer" aria-hidden="true">
		<img src={`${base}/tarot/cards/${card.image}`} alt="" loading="eager" decoding="sync" />
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
	}

	.card:not(.imageReady) {
		cursor: default;
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

	.prewarmLayer {
		position: absolute;
		inset: 0;
		opacity: 0;
		pointer-events: none;
		z-index: -1;
	}

	.prewarmLayer img {
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
