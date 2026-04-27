export type Lang = 'sv' | 'en';

type ElementKey = 'fire' | 'water' | 'earth' | 'air';

type TranslationSchema = {
	page: {
		title: string;
		intro: string;
		questionLabel: string;
		questionPlaceholder: string;
		drawButton: (count: number) => string;
		resetButton: string;
		cardCountLabel: (count: number) => string;
		progress: (flipped: number, total: number) => string;
		modeLabel: string;
		modeSoft: string;
		modeDirect: string;
		deckButton: string;
	};

	deck: {
		title: string;
		wipNote: string;
		cardCount: (count: number) => string;
		backButton: string;
		modal: {
			keywords: string;
			element: string;
		};
		sections: {
			major: string;
			cups: string;
			wands: string;
			swords: string;
			stones: string;
		};
	};

	elements: Record<ElementKey, string>;

	elementMap: Record<string, ElementKey>;

	keywordMap: Record<string, string>;

	questions: {
		1: string[];
		2: string[];
		3: string[];
	};

	scroll: {
		title: string;
		hint: string;
	};

	prompt: {
		interpretationHeader: string;
		header: string;
		copy: string;
		copied: string;
		disclaimer: {
			base: string;
			soft: string;
			direct: string;
		};

		title: string;
		questionIntro: string;
		cardsIntro: (count: number) => string;

		frames: {
			one: string;
			two: string;
			three: string;
		};

		directFrames: {
			one: string;
			two: string;
			three: string;
		};

		tone: string;
		directTone: string;
		summary: string;
	};
};

export const translations: Record<Lang, TranslationSchema> = {
	sv: {
		page: {
			title: 'Tarotläggning',
			intro:
				'Ställ en fråga, dra dina kort och få en reflekterande tolkning direkt. Ingen spådom – bara ett nytt perspektiv.',
			questionLabel: 'Din fråga:',
			questionPlaceholder: 'Vad vill du få vägledning kring just nu?',
			drawButton: (count: number) => `Dra ${count} kort`,
			resetButton: 'Ny dragning',

			cardCountLabel: (count: number) => (count === 1 ? '1 kort' : `${count} kort`),

			progress: (flipped: number, total: number) => `${flipped} / ${total} kort uppvända`,
			modeLabel: 'Hur vill du höra detta?',
			modeSoft: 'Mjukt',
			modeDirect: 'Rakt',
			deckButton: 'Kortlek'
		},
		deck: {
			title: 'Kortlek',
			wipNote: 'Denna sida är under utveckling. Vissa funktioner och översättningar saknas.',
			cardCount: (count: number) => `Antal kort: ${count}`,
			backButton: 'Tillbaka',
			modal: {
				keywords: 'Nyckelord',
				element: 'Element'
			},
			sections: {
				major: 'Major Arcana',
				cups: 'Bägare',
				wands: 'Stavar',
				swords: 'Svärd',
				stones: 'Stenar'
			}
		},
		elements: {
			fire: 'Eld',
			water: 'Vatten',
			earth: 'Jord',
			air: 'Luft'
		},
		elementMap: {
			Eld: 'fire',
			Vatten: 'water',
			Jord: 'earth',
			Luft: 'air'
		},
		keywordMap: {},
		questions: {
			1: [
				'Vad är kärnan i situationen just nu?',
				'Vad behöver jag förstå djupare?',
				'Vilken energi präglar detta ögonblick?'
			],
			2: [
				'Vad stöttar mig och vad håller mig tillbaka?',
				'Vad är inre påverkan och vad är yttre påverkan?',
				'Vad vill jag och vad behöver jag?'
			],
			3: [
				'Dåtid – Nutid – Framtid',
				'Situation – Utmaning – Vägledning',
				'Vad är synligt – Vad är dolt – Vad håller på att ta form'
			]
		},
		scroll: {
			title: 'En fråga att utforska',
			hint: 'Svep eller bläddra, tryck för att välja'
		},
		prompt: {
			interpretationHeader: 'Din tolkning',
			header: 'Tarotprompt – redo att kopiera',
			copy: 'Kopiera',
			copied: 'Kopierad ✓',
			disclaimer: {
				base: 'Frågan och tolkningen skapas av dig. Verktyget hjälper endast till att formulera en strukturerad tarot-prompt för reflektion eller vidare tolkning.',
				soft: 'En reflekterande tolkning baserad på korten. Ta till dig det som känns relevant och låt resten passera.',
				direct:
					'Denna tolkning ger en tydlig riktning baserad på korten. Den är inte absolut sanning, men den undviker inte att ge ett konkret svar.'
			},

			title: 'Tarotläggning – tolkning önskas',
			questionIntro: 'Jag har ställt följande fråga:',
			cardsIntro: (count: number) => `Jag drog ${count} tarotkort:`,

			frames: {
				one: `Tolka detta kort som ett övergripande budskap kopplat till frågan.
Fokusera på insikt, riktning och medvetenhet snarare än detaljer eller förutsägelser.`,

				two: `Tolka korten som två perspektiv som belyser frågan från olika håll.
Fokusera på hur de samspelar, kontrasterar eller kompletterar varandra.`,

				three: `Tolka tarotläggningen som en helhet, inte enbart kort för kort.
Fokusera på det övergripande temat, hur korten samspelar och vilken vägledning som är relevant för frågan.`
			},

			directFrames: {
				one: `Ge ett rakt budskap kopplat till frågan. Undvik tolkningar som blir för öppna – vad pekar detta tydligt på?`,

				two: `Tolka korten som en spänning eller konflikt. Vad blockerar och vad driver framåt? Var konkret.`,

				three: `Se helheten och peka ut en tydlig riktning. Vad behöver göras nu, trots tvekan eller motstånd?`
			},

			tone: 'Tolkningen ska vara reflekterande, jordnära och stödjande – inte förutsägande eller absolut.',

			directTone: 'Var tydlig, konkret och något utmanande. Undvik fluff och vaga formuleringar.',

			summary: 'Avsluta med en kort sammanfattning av kärnbudskapet.'
		}
	},

	en: {
		page: {
			title: 'Tarot Reading',
			intro:
				'Ask a question, draw your cards and get a reflective interpretation instantly. No predictions — just a new perspective.',
			questionLabel: 'Your question:',
			questionPlaceholder: 'What would you like guidance on right now?',
			drawButton: (count: number) => `Draw ${count} cards`,
			resetButton: 'New reading',

			cardCountLabel: (count: number) => (count === 1 ? '1 card' : `${count} cards`),

			progress: (flipped: number, total: number) => `${flipped} / ${total} cards revealed`,
			modeLabel: 'How do you want to hear this?',
			modeSoft: 'Soft',
			modeDirect: 'Direct',
			deckButton: 'Deck'
		},
		deck: {
			title: 'Deck',
			wipNote: 'This page is under development. Some features and translations are missing.',
			cardCount: (count: number) => `Number of cards: ${count}`,
			backButton: 'Back',
			modal: {
				keywords: 'Keywords',
				element: 'Element'
			},
			sections: {
				major: 'Major Arcana',
				cups: 'Cups',
				wands: 'Wands',
				swords: 'Swords',
				stones: 'Stones'
			}
		},
		elements: {
			fire: 'Fire',
			water: 'Water',
			earth: 'Earth',
			air: 'Air'
		},
		elementMap: {
			Eld: 'fire',
			Vatten: 'water',
			Jord: 'earth',
			Luft: 'air'
		},
		keywordMap: {
			acceptans: 'acceptance',
			ambivalens: 'ambivalence',
			analys: 'analysis',
			'andlig väg': 'spiritual path',
			ansvar: 'responsibility',
			arv: 'inheritance',
			autenticitet: 'authenticity',
			auktoritet: 'authority',
			avståndstagande: 'withdrawal',
			balans: 'balance',
			belöning: 'reward',
			beroende: 'dependency',
			begränsning: 'limitation',
			brist: 'lack',
			bundenhet: 'bondage',
			börda: 'burden',
			början: 'beginning',
			cykler: 'cycles',
			driv: 'drive',
			drömmar: 'dreams',
			ego: 'ego',
			'emotionell mognad': 'emotional maturity',
			ensamhet: 'solitude',
			entusiasm: 'enthusiasm',
			erkännande: 'recognition',
			eftertanke: 'reflection',
			firande: 'celebration',
			flöde: 'flow',
			fokus: 'focus',
			frihet: 'freedom',
			friktion: 'friction',
			fullbordan: 'completion',
			förfining: 'refinement',
			förlust: 'loss',
			förlåtelse: 'forgiveness',
			försvar: 'defense',
			förvandling: 'transformation',
			förvirring: 'confusion',
			förändring: 'change',
			framgång: 'success',
			framåtblick: 'foresight',
			glädje: 'joy',
			grund: 'foundation',
			hantverk: 'craft',
			harmoni: 'harmony',
			helhet: 'wholeness',
			hopp: 'hope',
			idealism: 'idealism',
			illusion: 'illusion',
			impuls: 'impulse',
			'inre visdom': 'inner wisdom',
			'inre styrka': 'inner strength',
			insikt: 'insight',
			inspiration: 'inspiration',
			integration: 'integration',
			integritet: 'integrity',
			intellekt: 'intellect',
			intuition: 'intuition',
			kamp: 'struggle',
			kallelse: 'calling',
			klarhet: 'clarity',
			kollaps: 'collapse',
			kontroll: 'control',
			kraft: 'power',
			kreativitet: 'creativity',
			känsla: 'feeling',
			känslighet: 'sensitivity',
			kärlek: 'love',
			ledarskap: 'leadership',
			ledning: 'leadership',
			livskraft: 'vitality',
			logik: 'logic',
			lycka: 'happiness',
			läkning: 'healing',
			lärande: 'learning',
			lära: 'teaching',
			manifestation: 'manifestation',
			materia: 'matter',
			medkänsla: 'compassion',
			'mental låsning': 'mental block',
			mod: 'courage',
			mysterium: 'mystery',
			nostalgi: 'nostalgia',
			nyfikenhet: 'curiosity',
			näring: 'nourishment',
			närvaro: 'presence',
			omsorg: 'care',
			oro: 'worry',
			oskuldsfullhet: 'innocence',
			otålighet: 'impatience',
			paus: 'pause',
			perspektiv: 'perspective',
			potential: 'potential',
			prövning: 'trial',
			pånyttfödelse: 'rebirth',
			reflektion: 'reflection',
			relation: 'relationship',
			riktning: 'direction',
			romantik: 'romance',
			rörelse: 'movement',
			samverkan: 'collaboration',
			sanning: 'truth',
			självständighet: 'independence',
			självsäkerhet: 'confidence',
			skapande: 'creation',
			skaparkraft: 'creative force',
			skapelse: 'creation',
			skugga: 'shadow',
			skärpa: 'sharpness',
			snabbhet: 'speed',
			slut: 'ending',
			slutpunkt: 'endpoint',
			smärta: 'pain',
			sorg: 'grief',
			språng: 'leap',
			stabilitet: 'stability',
			stillhet: 'stillness',
			struktur: 'structure',
			styrka: 'strength',
			sökande: 'seeking',
			tillit: 'trust',
			tillfredsställelse: 'satisfaction',
			tempo: 'pace',
			timing: 'timing',
			tradition: 'tradition',
			tro: 'faith',
			trygghet: 'security',
			tvivel: 'doubt',
			tålamod: 'patience',
			undvikande: 'avoidance',
			uppoffring: 'sacrifice',
			uppvaknande: 'awakening',
			utforskande: 'exploration',
			uthållighet: 'endurance',
			utbyte: 'exchange',
			val: 'choice',
			visdom: 'wisdom',
			vila: 'rest',
			vilja: 'will',
			viljestyrka: 'willpower',
			vision: 'vision',
			värderingar: 'values',
			återhämtning: 'recovery',
			ångest: 'anxiety',
			ärlighet: 'honesty',
			öde: 'fate',
			ömsesidighet: 'mutuality',
			öppning: 'opening',
			överansvar: 'over-responsibility',
			överflöd: 'abundance',
			övergång: 'transition'
		},
		questions: {
			1: [
				'What is the core of this situation right now?',
				'What needs deeper understanding?',
				'What energy defines this moment?'
			],
			2: [
				'What supports me and what holds me back?',
				'What is internal influence and what is external influence?',
				'What do I want and what do I need?'
			],
			3: [
				'Past – Present – Future',
				'Situation – Challenge – Guidance',
				'What is visible – What is hidden – What is emerging'
			]
		},
		scroll: {
			title: 'Choose a thread to follow',
			hint: 'Swipe or turn, tap to choose'
		},
		prompt: {
			interpretationHeader: 'Your interpretation',
			header: 'Tarot prompt – ready to copy',
			copy: 'Copy',
			copied: 'Copied ✓',
			disclaimer: {
				base: 'The question and interpretation are created by you. The tool only helps structure a tarot prompt for reflection or further interpretation.',
				soft: 'This interpretation is meant for reflection. Take what resonates and leave the rest.',
				direct:
					'This interpretation offers a clear direction based on the cards. It is not absolute truth, but it does not avoid giving a concrete answer.'
			},

			title: 'Tarot reading – interpretation requested',

			questionIntro: 'I asked the following question:',

			cardsIntro: (count: number) => `I drew ${count} tarot card${count > 1 ? 's' : ''}:`,

			frames: {
				one: `Interpret this card as an overall message connected to the question.
Focus on insight, direction and awareness rather than detailed predictions.`,

				two: `Interpret the cards as two perspectives illuminating the question from different angles.
Focus on how they interact, contrast or complement each other.`,

				three: `Interpret the tarot reading as a whole, not just card by card.
Focus on the overall theme, how the cards interact and what guidance is relevant to the question.`
			},

			directFrames: {
				one: `Give a clear and direct message connected to the question. Avoid overly open interpretation — what does this clearly point to?`,

				two: `Interpret the cards as tension or conflict. What is blocking you and what pushes forward? Be concrete.`,

				three: `Look at the whole and point to a clear direction. What needs to be done now, despite hesitation or resistance?`
			},

			tone: 'The interpretation should be reflective, grounded and supportive — not predictive or absolute.',

			directTone: 'Be clear, concrete and slightly challenging. Avoid fluff and vague language.',

			summary: 'End with a short summary of the core message.'
		}
	}
};
