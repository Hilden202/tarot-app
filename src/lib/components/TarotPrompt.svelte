<script lang="ts">
    import type { TarotCardData } from "$lib/data/tarotDeck";
    export let cards: TarotCardData[];
    export let question: string;

    let copied = false;

    function copyPrompt() {
        navigator.clipboard.writeText(promptText);
        copied = true;

        setTimeout(() => {
            copied = false;
        }, 2000);
    }

   $: promptText = `Tarotläggning – tolkning önskas

Jag har ställt följande fråga:
"${question}"

Jag drog ${cards.length} tarotkort, som vändes ett i taget:
${cards.map(c => `- ${c.fullTitle}`).join("\n")}

Tolka denna tarotläggning som en helhet, inte enbart kort för kort.
Fokusera på:
- det övergripande temat eller budskapet
- hur korten samspelar med varandra
- vilken vägledning eller insikt som är relevant för min fråga

Tolkningen ska vara reflekterande, jordnära och stödjande –
inte förutsägande eller absolut.

Avsluta med en kort sammanfattning av kärnbudskapet.`;
    
</script>


<div class="prompt-box">
    <div class="prompt-header">
        <h3>Tarotprompt – redo att kopiera</h3>

        <button class="copy-btn" on:click={copyPrompt}>
            {copied ? "Kopierad ✓" : "Kopiera"}
        </button>
    </div>

    <pre class="prompt-content">
<code>{promptText}</code>
    </pre>
</div>

<style>
    .prompt-box {
        background: #f6f6f6;
        border-radius: 8px;
        padding: 0;
        width: 100%;
        max-width: 800px;
    }

    .prompt-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #ddd;
    }

    .prompt-header h3 {
        margin: 0;
        font-size: 1rem;
    }

    .copy-btn {
        font-size: 0.85rem;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
    }

    .prompt-content {
        padding: 1rem;
        margin: 0;
        font-family: monospace;
        white-space: pre-wrap;
        overflow-x: auto;
    }

</style>
