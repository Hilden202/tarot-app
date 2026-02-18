console.log("LANGUAGE STORE LOADED");

import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Lang = 'sv' | 'en';

const createLanguageStore = () => {
	const { subscribe, set } = writable<Lang>('sv');

	function init() {
		if (!browser) return;

		const saved = localStorage.getItem('lang') as Lang | null;

		if (saved) {
			set(saved);
			return;
		}

		const systemLang = navigator.language.toLowerCase();
		const detected: Lang = systemLang.startsWith('sv') ? 'sv' : 'en';

		set(detected);
		localStorage.setItem('lang', detected);
	}

	function change(lang: Lang) {
		set(lang);
		if (browser) {
			localStorage.setItem('lang', lang);
		}
	}

	return {
		subscribe,
		init,
		change
	};
};

export const language = createLanguageStore();
