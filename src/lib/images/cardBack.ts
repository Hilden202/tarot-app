import { browser } from '$app/environment';
import { base } from '$app/paths';

export const cardBackImageSrc = `${base}/tarot/back/TarotKort_Baksida.png`;

let cardBackImage: HTMLImageElement | null = null;
let cardBackImagePromise: Promise<void> | null = null;

export function preloadCardBackImage(): Promise<void> {
	if (!browser) return Promise.resolve();
	if (cardBackImagePromise) return cardBackImagePromise;

	cardBackImage = new Image();
	cardBackImage.decoding = 'sync';
	cardBackImage.loading = 'eager';

	cardBackImagePromise = new Promise((resolve) => {
		const finalize = async () => {
			try {
				await cardBackImage?.decode();
			} catch {
				// decode() can reject for already-decoded or unsupported cases.
			}

			resolve();
		};

		cardBackImage!.onload = () => {
			void finalize();
		};
		cardBackImage!.onerror = () => resolve();
		cardBackImage!.src = cardBackImageSrc;

		if (cardBackImage!.complete) {
			void finalize();
		}
	});

	return cardBackImagePromise;
}
