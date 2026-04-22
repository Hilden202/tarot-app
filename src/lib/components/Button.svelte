<script lang="ts">
	export let variant: 'primary' | 'ghost' | 'secondary' | 'subtle' = 'primary';
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
		background: linear-gradient(to bottom, var(--accent-light), var(--accent-dark));
		color: var(--accent-text);
		text-shadow: var(--accent-text-shadow);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.2),
			0 8px 20px rgba(0, 0, 0, 0.25);
	}

	.btn.primary:hover:not(:disabled) {
		filter: brightness(1.05);
	}

	/* GHOST */
	.btn.ghost {
		background: var(--surface-color);
		color: var(--text-color);
		border: 1px solid var(--muted-color);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
	}

	.btn.ghost:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	}

	/* SECONDARY */
	.btn.secondary {
		background: var(--secondary-color);
		color: var(--secondary-text-color);
		border: 1px solid var(--muted-color);
	}

	.btn.secondary:hover:not(:disabled) {
		background: var(--secondary-hover-color);
	}

	/* SUBTLE */
	.btn.subtle {
		background: transparent;
		color: var(--muted-color);
		border: none;
		box-shadow: none;
	}

	.btn.subtle:hover:not(:disabled) {
		opacity: 0.85;
		letter-spacing: 0.02em;
		color: var(--text-color);
		transform: translateY(-1px);
	}

	.btn:active:not(:disabled) {
		transform: scale(0.97);
	}
</style>
