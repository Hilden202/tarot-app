<script lang="ts">
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/i18n/translations';
	import type { TarotCardData } from '$lib/data/tarotDeck';

	export let cards: TarotCardData[];
	export let question: string;

	let t: (typeof translations)['sv'];
	let promptText: string;

	$: t = translations[$language ?? 'sv'];

	let copied = false;

	function copyPrompt() {
		navigator.clipboard.writeText(promptText);
		copied = true;

		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	function getInterpretationFrame(cardCount: number) {
		if (cardCount === 1) return t.prompt.frames.one;
		if (cardCount === 2) return t.prompt.frames.two;
		return t.prompt.frames.three;
	}

	$: promptText = `${t.prompt.title}

	${t.prompt.questionIntro}
	"${question}"

	${t.prompt.cardsIntro(cards.length)}
	${cards.map((c) => `- ${c.fullTitle}`).join('\n')}

	${getInterpretationFrame(cards.length)}

	${t.prompt.tone}

	${t.prompt.summary}`;
</script>

<div class="prompt-box">
	<div class="prompt-header">
		<h3>{t.prompt.header}</h3>

		<button class="copy-btn" on:click={copyPrompt}>
			{copied ? t.prompt.copied : t.prompt.copy}
		</button>
	</div>

	<p class="disclaimer">{t.prompt.disclaimer}</p>

	<div class="prompt-content">
		{#each promptText.split('\n') as line}
			<p>{line}</p>
		{/each}
	</div>
</div>

<style>
	.prompt-box {
		background: var(--surface-color);
		border-radius: 8px;
		width: 100%;
		max-width: 800px;
	}

	.prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--muted-color);
	}

	.prompt-header h3 {
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

	.prompt-content {
		text-align: left;
		padding: 1rem;
		margin: 0;
		font-family: monospace;
		overflow-x: auto;
	}

	.prompt-content p {
		margin: 0 0 0.6rem 0;
	}

	.disclaimer {
		margin: 0.5rem 1rem;
		font-size: 0.75rem;
		color: var(--muted-color);
		text-align: center;
	}
</style>
