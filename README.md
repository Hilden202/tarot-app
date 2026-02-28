# Tarot App

🔗 Live: https://tarot.hildenmedia.se

A small SvelteKit-based tarot app MVP exploring tarot as a structured prompt generator for AI.

---

## Background

The idea came from finding an unused tarot deck during a move.
Instead of interpreting the cards myself, I started experimenting with using AI as a reflective tool.

This app doesn’t interpret the cards for you.
Instead, it helps structure a question and generates a ready-made prompt that can be used with any LLM — keeping the ritual and symbolism, while outsourcing the wording.

The goal was to explore how traditional reflection tools and modern AI can coexist without replacing the human part of the experience.

---

## Features

- Draw 1–3 tarot cards per session
- Flip cards individually
- Enter a question before drawing
- Generate an AI-ready tarot interpretation prompt
- Copy prompt to clipboard for use in any LLM

---

## Design Principles

- Tarot as reflection, not prediction
- AI as a conversational mirror, not an authority
- Minimal UI with focus on flow and presence
- No built-in interpretation — the user stays in control

---

## Tech Stack

- SvelteKit
- TypeScript
- CSS (custom styling)
- Static deployment

---

## Project Scope

This is an MVP built as a learning project with focus on:

- Clean component structure
- Clear UI flow
- State-driven interactions
- Exploring modern frontend tooling

The app is intentionally simple and opinionated.

---

## Local Development

```bash
npm install
npm run dev
