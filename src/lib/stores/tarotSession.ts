import { writable } from 'svelte/store';
import type { TarotCardData } from '$lib/data/tarotDeck';

export type TarotMode = 'soft' | 'direct';

export type TarotSession = {
	selectedCards: TarotCardData[];
	question: string;
	flippedIds: Set<string>;
	interpretation: string;
	interpretationCache: Record<string, Record<string, string>>;
	mode: TarotMode | null;
	drawId: number;
	hasDrawn: boolean;
};

export const createTarotSession = (): TarotSession => ({
	selectedCards: [],
	question: '',
	flippedIds: new Set<string>(),
	interpretation: '',
	interpretationCache: {},
	mode: null,
	drawId: 0,
	hasDrawn: false
});

export const tarotSession = writable<TarotSession>(createTarotSession());
