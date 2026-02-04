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

    let cardCount = 3;

    let hasDrawn = false

    function resetDraw() {
        selectedCards = [];
        flippedIds = new Set<string>();
        question = "";
        hasDrawn = false;
    }

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

        while (returnSelected.length < cardCount && deckCopy.length > 0) {
            const randomIndex = Math.floor(Math.random() * deckCopy.length);

            // plocka kortet
            const [card] = deckCopy.splice(randomIndex, 1);

            // lägg i selectedCards
            returnSelected.push(card)
        }
        // ersätt
        selectedCards = returnSelected;
        hasDrawn = true;
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
        <div class="question">
            {#if !hasDrawn}
                <div class="card-count">
                    <label>
                        <input type="radio" bind:group={cardCount} value={1}/>
                        1 kort
                    </label>

                    <label>
                        <input type="radio" bind:group={cardCount} value={2}/>
                        2 kort
                    </label>

                    <label>
                        <input type="radio" bind:group={cardCount} value={3}/>
                        3 kort
                    </label>
                </div>
            {/if}

            <label>
                <span>Din fråga:</span>
                <textarea
                        bind:value={question}
                        placeholder="Vad vill du få vägledning kring just nu?"
                        disabled={hasDrawn}
                />
            </label>
        </div>

        {#if !hasDrawn}
            <button
                    on:click={newCards}
                    disabled={!question.trim()}
            >
                Dra {cardCount} kort
            </button>
        {:else}
            <button
                    on:click={resetDraw}
            >
                Ny dragning
            </button>
        {/if}

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
        flex-wrap: wrap;
    }

    .card-count {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .card-count label {
        display: flex;
        gap: 0.25rem;
        align-items: center;
        font-size: 0.9rem;
    }

    .controls {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 1rem;
    }

    @media (max-width: 600px) {
        .controls {
            flex-direction: column;
            align-items: stretch;
        }

        .controls button {
            width: 100%;
            max-width: 420px;
            align-self: center;
        }
    }

    .question {
        width: 100%;
        max-width: 420px;
    }


    .question textarea {
        width: 100%;
        min-height: 60px;
        box-sizing: border-box;
        font-size: 16px;
    }

    .prompt {
        display: flex;
        justify-content: center;
    }

    @media (max-width: 600px) {
        .cards {
            gap: 1rem;
        }
    }

</style>