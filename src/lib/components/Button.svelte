<script lang="ts">
	export let variant: 'primary' | 'ghost' = 'primary';
	export let disabled = false;
	export let type: 'button' | 'submit' = 'button';
</script>

<button class={`btn ${variant}`} {type} {disabled} on:click>
	<slot />
</button>

<style>
	.btn {
		font-size: 0.95rem;
		padding: 0.55rem 1.2rem;
		border-radius: 6px;
		cursor: pointer;
		border: 1px solid transparent;
		background: none;
		transition: all 0.2s ease;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* PRIMARY */
	.btn.primary {
		background: var(--accent-color);
		color: var(--bg-color);
		border-color: var(--accent-color);
	}

	.btn.primary:hover:not(:disabled) {
		filter: brightness(1.05);
	}

	/* GHOST */
	.btn.ghost {
		background: transparent;
		color: var(--text-color);
		border-color: var(--muted-color);
	}

	.btn.ghost:hover:not(:disabled) {
		background: var(--surface-color);
	}
</style>
