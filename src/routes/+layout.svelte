<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children } = $props();
	let theme = $state<'clean' | 'soul'>('clean');

	function toggleTheme() {
		theme = theme === 'clean' ? 'soul' : 'clean';

		if (browser) {
			document.body.dataset.theme = theme;
			localStorage.setItem('theme', theme);
		}
	}

	onMount(() => {
		if (!browser) return;

		const saved = localStorage.getItem('theme') as 'clean' | 'soul' | null;

		if (saved) {
			theme = saved;
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			theme = prefersDark ? 'soul' : 'clean';
		}

		document.body.dataset.theme = theme;

		// 🔥 live system detection
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		media.addEventListener('change', (e) => {
			if (!localStorage.getItem('theme')) {
				theme = e.matches ? 'soul' : 'clean';
				document.body.dataset.theme = theme;
			}
		});
	});
</script>

<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
	<span class="icon" aria-hidden="true">
		{theme === 'clean' ? '🌙' : '☀️'}
	</span>
</button>

{@render children()}

<style>
	:global(html),
	:global(body) {
		margin: 0;
		min-height: 100%;
		background: var(--bg-color);
	}

	html,
	body {
		margin: 0;
		min-height: 100%;
	}

	body {
		transition:
			background 0.8s cubic-bezier(0.4, 0, 0.2, 1),
			color 0.4s ease,
			background-color 0.6s ease;
	}
	.theme-toggle {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 1000;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 44px;
		height: 44px;

		border-radius: 999px;
		border: 1px solid currentColor;

		background: transparent;
		color: var(--text-color);

		cursor: pointer;

		transition:
			background 0.25s ease,
			border-color 0.25s ease,
			transform 0.15s ease,
			box-shadow 0.3s ease;
	}

	.theme-toggle:hover {
		background: var(--accent-light);
		color: var(--accent-text);
		border-color: var(--accent-light);
		transform: translateY(-1px);
	}

	.theme-toggle:active {
		transform: translateY(0);
	}

	.icon {
		display: inline-block;
		transition: transform 0.3s ease;
	}

	.theme-toggle:hover .icon {
		transform: rotate(15deg) scale(1.1);
	}
</style>
