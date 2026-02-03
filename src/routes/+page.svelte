<script lang="ts">
    import TarotCard from "$lib/components/TarotCard.svelte";
    import TarotPrompt from "$lib/components/TarotPrompt.svelte";
    import {tarotDeck} from "$lib/data/tarotDeck";
    import type {TarotCardData} from "$lib/data/tarotDeck";

    let selectedCards: TarotCardData[] = [];

    let allCardsFlipped: boolean = false;
    let flippedIds = new Set<string>();

    let question = "";

    let drawId = 0;

    function handleFlipChange(payload: { id: string; isFlipped: boolean }) {
        const next = new Set(flippedIds);

        if (payload.isFlipped) {
            next.add(payload.id);
        } else {
            next.delete(payload.id);
        }

        flippedIds = next;
    }

    $: allCardsFlipped =
        selectedCards.length > 0 &&
        flippedIds.size === selectedCards.length;

    function newCards() {
        // reset
        flippedIds = new Set<string>();
        drawId++;

        // skapa nytt kort
        const deckCopy = [...tarotDeck];
        const returnSelected: TarotCardData[] = [];

        while (returnSelected.length < 3 && deckCopy.length > 0) {
            const randomIndex = Math.floor(Math.random() * deckCopy.length);

            // plocka kortet
            const [card] = deckCopy.splice(randomIndex, 1);

            // lägg i selectedCards
            returnSelected.push(card)
        }
        // ersätt
        selectedCards = returnSelected;
    }

</script>

<div class="app">
    <header class="header">
        <h1>Tarot app</h1>
        <p>{flippedIds.size} / {selectedCards.length} kort uppvända</p>
    </header>

    <section class="cards">
        {#each selectedCards as card (`${drawId}-${card.id}`)}
            <TarotCard
                    card={card}
                    onFlipChange={handleFlipChange}
            />
        {/each}
    </section>

    <section class="controls">
        <label class="question">
            <span>Din fråga:</span>
            <textarea
                    bind:value={question}
                    placeholder="Vad vill du få vägledning kring just nu?"
            />
        </label>

        <button
                on:click={newCards}
                disabled={!question.trim()}
        >
            Dra 3 kort
        </button>
    </section>

    {#if allCardsFlipped}
        <section class="prompt">
            <TarotPrompt
                    question={question}
                    cards={selectedCards}
            />
        </section>
    {/if}
</div>

<style>
    .app {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .header {
        text-align: center;
    }

    .cards {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
    }

    .controls {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 1rem;
    }

    .question {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .question textarea {
        min-width: 280px;
        min-height: 60px;
    }

    .prompt {
        display: flex;
        justify-content: center;
    }
</style>