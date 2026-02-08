<script lang="ts">
    import type {TarotCardData} from "$lib/data/tarotDeck";

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

    function getInterpretationFrame(cardCount: number) {
        if (cardCount === 1) {
            return `Tolka detta kort som ett övergripande budskap kopplat till frågan.
Fokusera på insikt, riktning och medvetenhet snarare än detaljer eller förutsägelser.`;
        }

        if (cardCount === 2) {
            return `Tolka korten som två perspektiv som belyser frågan från olika håll.
Fokusera på hur de samspelar, kontrasterar eller kompletterar varandra.`;
        }

        // default: 3-korts vägledning
        return `Tolka tarotläggningen som en helhet, inte enbart kort för kort.
Fokusera på det övergripande temat, hur korten samspelar och vilken vägledning som är relevant för frågan.`;
    }

    $: promptText = `Tarotläggning – tolkning önskas

Jag har ställt följande fråga:
"${question}"

Jag drog ${cards.length} tarotkort:
${cards.map(c => `- ${c.fullTitle}`).join("\n")}

${getInterpretationFrame(cards.length)}

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

    <p class="disclaimer">
        Frågan och tolkningen skapas av dig. Verktyget hjälper endast till att
        formulera en strukturerad tarot-prompt för reflektion eller vidare tolkning.
    </p>
    
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

    .disclaimer {
        margin: 0.5rem 1rem;
        font-size: 0.75rem;
        color: #777;
        text-align: center;
    }

</style>
