<script lang="ts">
    export let variant: "primary" | "ghost" = "primary";
    export let disabled = false;
    export let type: "button" | "submit" = "button";
</script>

<button
        class={`btn ${variant}`}
        {type}
        {disabled}
        on:click
>
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
        transition: background 0.15s ease, color 0.15s ease;
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Primary – stilla, mörk */
    .btn.primary {
        background: #111;
        color: #f5f5f5;
    }

    .btn.primary:hover:not(:disabled) {
        background: #000;
    }

    /* Ghost – sekundär */
    .btn.ghost {
        background: transparent;
        color: #111;
        border-color: #ccc;
    }

    .btn.ghost:hover:not(:disabled) {
        background: #f2f2f2;
    }
</style>
