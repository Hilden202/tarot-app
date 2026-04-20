<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';

	type ScrollEventDetail = {
		index: number;
		question: string;
	};

	export let questions: string[] = [];
	export let currentIndex = 0;
	export let hint = 'Swipe to wander, tap to choose';
	export let title = 'Choose a thread to follow';
	export let disabled = false;
	export let ariaLabel = 'Tarot question scroll';

	const dispatch = createEventDispatcher<{
		change: ScrollEventDetail;
		select: ScrollEventDetail;
	}>();

	let direction: 1 | -1 = 1;
	let dragDistance = 0;
	let startY = 0;
	let startX = 0;
	let pointerActive = false;
	let moved = false;

	$: totalQuestions = questions.length;
	$: if (totalQuestions === 0) {
		currentIndex = 0;
	} else if (currentIndex >= totalQuestions || currentIndex < 0) {
		currentIndex = ((currentIndex % totalQuestions) + totalQuestions) % totalQuestions;
	}

	$: currentQuestion = questions[currentIndex] ?? '';

	function mysticShift(
		node: Element,
		params: { y?: number; delay?: number } = {}
	): TransitionConfig {
		const y = params.y ?? 28;
		const delay = params.delay ?? 0;

		return {
			delay,
			duration: 360,
			easing: cubicOut,
			css: (t) => `opacity:${t}; --anim-y:${(1 - t) * y}px;`
		};
	}

	function emitChange() {
		dispatch('change', { index: currentIndex, question: currentQuestion });
	}

	function cycle(step: 1 | -1) {
		if (disabled || totalQuestions < 2) return;
		direction = step;
		currentIndex = (currentIndex + step + totalQuestions) % totalQuestions;
		dragDistance = 0;
		emitChange();
	}

	function selectCurrent() {
		if (disabled || !currentQuestion) return;
		dispatch('select', { index: currentIndex, question: currentQuestion });
	}

	function handlePointerDown(event: PointerEvent) {
		if (disabled || totalQuestions < 2) return;
		pointerActive = true;
		moved = false;
		dragDistance = 0;
		startY = event.clientY;
		startX = event.clientX;
	}

	function handlePointerMove(event: PointerEvent) {
		const currentTarget = event.currentTarget as HTMLElement | null;

		if (currentTarget) {
			const rect = currentTarget.getBoundingClientRect();
			const pointerX = ((event.clientX - rect.left) / rect.width) * 100;
			const pointerY = ((event.clientY - rect.top) / rect.height) * 100;
			currentTarget.style.setProperty('--pointer-x', `${pointerX}%`);
			currentTarget.style.setProperty('--pointer-y', `${pointerY}%`);
			currentTarget.style.setProperty(
				'--tilt-x',
				`${((event.clientY - rect.top) / rect.height - 0.5) * -3}deg`
			);
			currentTarget.style.setProperty(
				'--tilt-y',
				`${((event.clientX - rect.left) / rect.width - 0.5) * 4}deg`
			);
		}

		if (!pointerActive) return;

		const deltaY = event.clientY - startY;
		const deltaX = event.clientX - startX;

		if (Math.abs(deltaY) > 6 || Math.abs(deltaX) > 6) {
			moved = true;
		}

		if (Math.abs(deltaY) > Math.abs(deltaX)) {
			dragDistance = Math.max(-40, Math.min(40, deltaY * 0.35));
		}
	}

	function finishGesture(event?: PointerEvent) {
		if (!pointerActive) return;
		pointerActive = false;

		const threshold = 18;

		if (dragDistance <= -threshold) {
			cycle(1);
			return;
		}

		if (dragDistance >= threshold) {
			cycle(-1);
			return;
		}

		dragDistance = 0;
	}

	function resetTilt(event: PointerEvent) {
		const currentTarget = event.currentTarget as HTMLElement | null;
		if (currentTarget) {
			currentTarget.style.setProperty('--tilt-x', '0deg');
			currentTarget.style.setProperty('--tilt-y', '0deg');
			currentTarget.style.setProperty('--pointer-x', '50%');
			currentTarget.style.setProperty('--pointer-y', '50%');
		}
		finishGesture();
	}

	function handleClick() {
		if (!moved) {
			selectCurrent();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
			event.preventDefault();
			cycle(1);
		} else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
			event.preventDefault();
			cycle(-1);
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectCurrent();
		}
	}
</script>

<div class="tarot-scroll-wrap">
	<div
		class:disabled
		class="tarot-scroll"
		role="button"
		tabindex={disabled ? -1 : 0}
		aria-label={ariaLabel}
		aria-disabled={disabled}
		on:click={handleClick}
		on:keydown={handleKeydown}
		on:pointerdown={handlePointerDown}
		on:pointermove={handlePointerMove}
		on:pointerup={(e) => finishGesture(e)}
		on:pointercancel={(e) => finishGesture(e)}
		on:pointerleave={resetTilt}
		style={`--drag-y:${dragDistance}px;`}
	>
		<div class="scroll-roll top" aria-hidden="true"></div>
		<div class="scroll-roll bottom" aria-hidden="true"></div>

		<button
			on:pointerdown|stopPropagation
			type="button"
			class="arrow arrow-up"
			on:click|stopPropagation={() => cycle(1)}
			aria-label="Previous question"
			disabled={disabled || totalQuestions < 2}
		>
			<span>↑</span>
		</button>

		<div class="scroll-face">
			<div class="texture" aria-hidden="true"></div>
			<div class="edge-shadow" aria-hidden="true"></div>
			<div class="rune-glow" aria-hidden="true"></div>

			<div class="question-frame">
				<p class="eyebrow">{title}</p>

				<div class="question-stage">
					{#key `${currentIndex}-${currentQuestion}`}
						<p
							class="question-text"
							in:mysticShift={{ y: direction > 0 ? 28 : -28 }}
							out:mysticShift={{ y: direction > 0 ? -28 : 28 }}
						>
							{currentQuestion}
						</p>
					{/key}
				</div>

				<p class="hint">{hint}</p>
			</div>
		</div>

		<button
			on:pointerdown|stopPropagation
			type="button"
			class="arrow arrow-down"
			on:click|stopPropagation={() => cycle(-1)}
			aria-label="Next question"
			disabled={disabled || totalQuestions < 2}
		>
			<span>↓</span>
		</button>
	</div>
</div>

<style>
	:global(:root) {
		--tarot-scroll-font:
			'Cormorant Garamond', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif;
	}

	.tarot-scroll-wrap {
		width: 100%;
		perspective: 1200px;
	}

	.tarot-scroll {
		--pointer-x: 50%;
		--pointer-y: 50%;
		--tilt-x: 0deg;
		--tilt-y: 0deg;
		position: relative;
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr) 2.5rem;
		align-items: center;
		gap: 0.35rem;
		padding: 0.7rem 0;
		transform-style: preserve-3d;
		user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		touch-action: none;
		-webkit-touch-callout: none;
	}

	.scroll-face {
		position: relative;
		height: 5.2rem;
		padding: 0.6rem 0.8rem;
		border-radius: 1.2rem;
		cursor: pointer;
		overflow: hidden;
		transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
		transition:
			transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 260ms ease,
			filter 260ms ease;
		background:
			radial-gradient(
				circle at var(--pointer-x) var(--pointer-y),
				rgba(255, 248, 220, 0.75),
				transparent 34%
			),
			linear-gradient(180deg, #eedfba 0%, #e6d2ac 42%, #dcc294 100%);
		box-shadow:
			inset 0 1px 0 rgba(255, 252, 240, 0.75),
			inset 0 -12px 24px rgba(108, 74, 33, 0.12),
			inset 10px 0 20px rgba(113, 78, 40, 0.06),
			inset -10px 0 20px rgba(113, 78, 40, 0.06),
			0 18px 35px rgba(58, 36, 16, 0.22),
			0 8px 16px rgba(58, 36, 16, 0.14);
		filter: saturate(0.96);
	}

	.tarot-scroll:hover .scroll-face,
	.tarot-scroll:focus-within .scroll-face {
		box-shadow:
			inset 0 1px 0 rgba(255, 252, 240, 0.8),
			inset 0 -12px 24px rgba(108, 74, 33, 0.15),
			inset 10px 0 20px rgba(113, 78, 40, 0.08),
			inset -10px 0 20px rgba(113, 78, 40, 0.08),
			0 24px 44px rgba(58, 36, 16, 0.26),
			0 0 0 1px rgba(121, 89, 45, 0.14);
	}

	.scroll-roll {
		position: absolute;
		left: 3rem;
		right: 3rem;
		height: 0.8rem;
		border-radius: 999px;
		pointer-events: none;
		background:
			linear-gradient(180deg, rgba(114, 80, 43, 0.44), rgba(73, 48, 22, 0.2)),
			linear-gradient(180deg, #f0e0b8, #cfb07b);
		box-shadow:
			0 3px 10px rgba(58, 36, 16, 0.16),
			inset 0 1px 0 rgba(255, 249, 229, 0.42);
		z-index: 2;
	}

	.scroll-roll.top {
		top: 0.15rem;
		transform: translateZ(14px);
	}

	.scroll-roll.bottom {
		bottom: 0.15rem;
		transform: translateZ(14px);
	}

	.texture,
	.edge-shadow,
	.rune-glow {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.texture {
		background:
			radial-gradient(circle at 18% 24%, rgba(120, 88, 43, 0.08), transparent 16%),
			radial-gradient(circle at 74% 34%, rgba(120, 88, 43, 0.05), transparent 18%),
			radial-gradient(circle at 52% 78%, rgba(120, 88, 43, 0.06), transparent 14%),
			repeating-linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.02) 0,
				rgba(255, 255, 255, 0.02) 2px,
				rgba(140, 108, 62, 0.02) 3px,
				rgba(140, 108, 62, 0.02) 4px
			);
		mix-blend-mode: multiply;
		opacity: 0.7;
	}

	.edge-shadow {
		border-radius: inherit;
		box-shadow:
			inset 0 0 0 1px rgba(102, 72, 35, 0.15),
			inset 0 0 38px rgba(103, 70, 33, 0.14);
	}

	.rune-glow {
		background:
			radial-gradient(circle at 22% 22%, rgba(255, 243, 198, 0.4), transparent 12%),
			radial-gradient(circle at 82% 74%, rgba(255, 236, 182, 0.28), transparent 10%);
		opacity: 0.85;
		animation: shimmer 9s ease-in-out infinite;
	}

	.question-frame {
		position: relative;
		z-index: 1;
		min-height: 3.2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		color: #4a3420;
		height: 100%;
	}

	.eyebrow {
		margin: 0 0 0.2rem;
		font-size: 0.6rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(87, 59, 28, 0.72);
	}

	.question-stage {
		position: relative;
		height: 3rem;
		overflow: hidden;
	}

	.question-stage > * {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(calc(-50% + var(--anim-y, 0px) + var(--drag-y, 0px)));
		transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform;
	}

	.question-text {
		margin: 0;
		font-family: var(--tarot-scroll-font);
		font-size: clamp(0.85rem, 1.3vw, 1rem);
		line-height: 1.15;
		letter-spacing: 0.02em;
		text-wrap: balance;
		text-shadow: 0 1px 0 rgba(255, 251, 240, 0.45);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.hint {
		margin: 0.3rem 0 0;
		font-size: 0.7rem;
		color: rgba(87, 59, 28, 0.72);
	}

	.arrow {
		position: relative;
		z-index: 3;
		width: 2.5rem;
		height: 2.5rem;
		border: 0;
		border-radius: 999px;
		cursor: pointer;
		color: #684726;
		background: rgba(92, 61, 28, 0.09);
		box-shadow:
			inset 0 1px 0 rgba(255, 249, 229, 0.45),
			0 6px 16px rgba(58, 36, 16, 0.12);
		backdrop-filter: blur(4px);
		transition:
			transform 180ms ease,
			background 180ms ease,
			box-shadow 180ms ease;
	}

	.arrow span {
		font-size: 1rem;
		display: inline-block;
		transform: translateY(-1px);
	}

	.arrow:hover:not(:disabled),
	.arrow:focus-visible:not(:disabled) {
		transform: scale(1.04);
		background: rgba(92, 61, 28, 0.14);
		box-shadow:
			inset 0 1px 0 rgba(255, 249, 229, 0.52),
			0 8px 18px rgba(58, 36, 16, 0.16);
	}

	.arrow:disabled,
	.disabled .arrow {
		opacity: 0.45;
		cursor: default;
	}

	.disabled .scroll-face {
		cursor: default;
		filter: grayscale(0.08);
	}

	.tarot-scroll:focus-visible {
		outline: none;
	}

	.tarot-scroll:focus-visible .scroll-face {
		box-shadow:
			inset 0 1px 0 rgba(255, 252, 240, 0.75),
			inset 0 -12px 24px rgba(108, 74, 33, 0.14),
			0 0 0 2px rgba(138, 103, 56, 0.32),
			0 18px 35px rgba(58, 36, 16, 0.22);
	}

	@keyframes shimmer {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
			opacity: 0.75;
		}
		50% {
			transform: translate3d(0, -1.5%, 0);
			opacity: 1;
		}
	}

	@media (max-width: 640px) {
		.tarot-scroll {
			grid-template-columns: 2.2rem minmax(0, 1fr) 2.2rem;
			gap: 0.2rem;
		}

		.scroll-face {
			height: 4.8rem;
			padding: 0.6rem 0.7rem;
		}

		.scroll-roll {
			left: 2.6rem;
			right: 2.6rem;
		}

		.question-text {
			font-size: 0.9rem;
		}

		.hint {
			font-size: 0.68rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-face,
		.arrow,
		.rune-glow {
			transition: none;
			animation: none;
		}
	}
</style>
