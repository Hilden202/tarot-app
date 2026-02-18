<script lang="ts">
	import { onMount } from 'svelte';

	let { children } = $props();
	let theme: 'clean' | 'soul' = 'clean';

	function toggleTheme() {
		theme = theme === 'clean' ? 'soul' : 'clean';
		document.body.dataset.theme = theme;
	}

	onMount(() => {
		document.body.dataset.theme = theme;
	});
</script>

<button class="theme-toggle" on:click={toggleTheme}>
	{theme === 'clean' ? '🌙' : '☀️'}
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

	/* 🌿 CLEAN */
	:global(body[data-theme='clean']) {
		--bg-color: #f5efe6;
		--text-color: #2f2a25;
		--muted-color: #6b6258;
		--surface-color: #ffffff;
		--card-border: rgba(0, 0, 0, 0.08);

		background: var(--bg-color);
		color: var(--text-color);
	}

	/* 🔥 SOUL */
	:global(body[data-theme='soul']) {
		--bg-color: #121a1b;
		--text-color: #e8e2d8;
		--muted-color: #b7ada1;
		--surface-color: rgba(255, 255, 255, 0.06);
		--card-border: rgba(255, 255, 255, 0.08);

		background: radial-gradient(circle at top center, #1c2626 0%, #121a1b 60%, #0e1415 100%);

		color: var(--text-color);
	}

	.theme-toggle {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 1000;
		background: transparent;
		border: 1px solid var(--muted-color);
		color: var(--text-color);
		padding: 0.4rem 0.7rem;
		border-radius: 20px;
		cursor: pointer;
	}
</style>
