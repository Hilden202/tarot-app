# Tarot App

Live: https://tarot.hildenmedia.se

A small SvelteKit based tarot app MVP that explores tarot as a structured prompt generator for AI.

## Background

The idea started after finding an unused tarot deck during a move.
Instead of interpreting the cards myself, I began experimenting with using AI as a reflective tool.

This app does not provide a fixed interpretation of the cards.
Instead, it helps structure a question and generates a ready made prompt that can be used with any large language model.

The intention is to keep the ritual, symbolism and pause that tarot offers, while letting AI assist with wording and perspective rather than authority.

## Features

- Draw one to three tarot cards per session  
- Flip cards individually  
- Enter a question before drawing  
- Generate an AI ready tarot reflection prompt  
- Copy the prompt to the clipboard for use in any LLM  

## Design Principles

- Tarot as a tool for reflection rather than prediction  
- AI as a conversational mirror rather than an authority  
- Minimal interface with focus on flow and presence  
- No built in interpretation so the user stays in control  

## Tech Stack

- SvelteKit  
- TypeScript  
- Custom CSS styling  
- Static deployment  

## Project Scope

This project was built as a learning focused MVP with emphasis on:

- Clear component structure  
- Predictable UI flow  
- State driven interactions  
- Exploring modern frontend development  

The scope is intentionally limited and opinionated.

## Local Development

Install dependencies and start the development server.

```bash
npm install
npm run dev
