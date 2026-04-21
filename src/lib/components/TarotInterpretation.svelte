<script lang="ts">
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/i18n/translations';

	export let interpretation: string = '';
	export let displayedInterpretation: string = '';
	export let mode: 'soft' | 'direct' = 'soft';

	let t;
	$: t = translations[$language ?? 'sv'];

	$: disclaimer =
		mode === 'direct'
			? t.prompt.disclaimer.direct
			: t.prompt.disclaimer.soft;

	let copied = false;

	function copyInterpretation() {
		if (!interpretation) return;
		navigator.clipboard.writeText(interpretation);
		copied = true;

		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="interpretation-box">
	<div class="interpretation-header">
		<h3>{t.prompt.interpretationHeader}</h3>

		<button class="copy-btn" on:click={copyInterpretation}>
			{copied ? t.prompt.copied : t.prompt.copy}
		</button>
	</div>

	<p class="disclaimer">{disclaimer}</p>

	<div class="interpretation-content">
		{#each displayedInterpretation.split('\n') as line}
			<p>{line}</p>
		{/each}
	</div>
</div>

<style>
	.interpretation-box {
		background: var(--surface-color);
		border-radius: 8px;
		width: 100%;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
		border: 1px solid var(--card-border);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		min-height: 160px;
		display: flex;
		flex-direction: column;
	}

	.interpretation-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--muted-color);
	}

	.interpretation-header h3 {
		margin: 0;
		font-size: 1rem;
	}

	.copy-btn {
		font-size: 0.85rem;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		background: transparent;
		border: 1px solid var(--muted-color);
		color: var(--text-color);
		border-radius: 6px;
	}

	.interpretation-content {
		text-align: left;
		padding: 1rem;
		margin: 0;
		line-height: 1.6;
		flex: 1;
		min-height: 100px;
	}

	.interpretation-content p {
		margin: 0 0 0.6rem 0;
	}

	.disclaimer {
		margin: 0.5rem 1rem 1rem;
		font-size: 0.75rem;
		color: var(--muted-color);
		text-align: center;
	}
</style>
