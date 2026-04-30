<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/i18n/translations';

	let { children } = $props();
	let theme = $state<'clean' | 'soul'>('clean');
	let t = $derived(translations[$language ?? 'sv']);

	function toggleTheme() {
		theme = theme === 'clean' ? 'soul' : 'clean';

		if (browser) {
			document.body.dataset.theme = theme;
			localStorage.setItem('theme', theme);
		}
	}

	function toggleLang() {
		const next = $language === 'sv' ? 'en' : 'sv';
		language.change(next);
	}
	onMount(() => {
		language.init();
		// currentLang = get(language);

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

<div class="top-controls">
	<button class="theme-toggle" on:click={toggleTheme}>
		<span class="icon">
			{theme === 'clean' ? '🌙' : '☀️'}
		</span>
	</button>

	<button class="lang-toggle" on:click={toggleLang}>
		{($language ?? 'sv').toUpperCase()}
	</button>
</div>

<div class="background-layer" aria-hidden="true"></div>

<main>
	{@render children()}
</main>

<footer class="local-storage-notice">
	{t.layout.localStorageNotice}
</footer>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		min-height: 100%;
		background: var(--bg-color);
	}

	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		transition:
			background 0.8s cubic-bezier(0.4, 0, 0.2, 1),
			color 0.4s ease,
			background-color 0.6s ease;
	}

	main {
		flex: 1;
	}

	.top-controls {
		pointer-events: auto;
		position: fixed;
		top: 1rem;
		right: 1rem;
		display: flex;
		gap: 0.5rem;
		z-index: 9999;
	}
	.lang-toggle {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 44px;
		height: 44px;

		border-radius: 999px;
		border: 1px solid currentColor;

		background: transparent;
		color: var(--text-color);

		font-size: 0.8rem;
		cursor: pointer;
	}

	.theme-toggle {
		width: 44px;
		height: 44px;
		border-radius: 999px;
		border: 1px solid currentColor;
		background: transparent;
		color: var(--text-color);
		cursor: pointer;
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
	.background-layer {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: -1;
	}

	.local-storage-notice {
		margin: 0;
		padding: 1.5rem 1rem 1rem;
		color: var(--muted-color);
		font-size: 0.75rem;
		line-height: 1.35;
		text-align: center;
		opacity: 0.62;
	}
</style>
