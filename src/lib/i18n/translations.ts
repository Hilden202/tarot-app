export type Lang = 'sv' | 'en';

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
};

questions: {
        1: string[];
        2: string[];
        3: string[];
    
}

prompt: {
header: string;
copy: string;
copied: string;
disclaimer: string;

title: string;
questionIntro: string;
cardsIntro: (count: number) => string;

frames: {
one: string;
two: string;
three: string;
};

tone: string;
summary: string;
};
};

export const translations: Record<Lang, TranslationSchema> = {
sv: {
page: {
title: 'Tarotläggning',
intro: 'Ta ett ögonblick, formulera en fråga och dra dina kort.',
questionLabel: 'Din fråga:',
questionPlaceholder: 'Vad vill du få vägledning kring just nu?',
drawButton: (count: number) => `Dra ${count} kort`,
resetButton: 'Ny dragning',

cardCountLabel: (count: number) =>
count === 1 ? '1 kort' : `${count} kort`,

progress: (flipped: number, total: number) =>
`${flipped} / ${total} kort uppvända`
},
questions: {
  1: [
    'Vad är viktigt att vara medveten om just nu?',
    'Vad behöver min uppmärksamhet idag?',
    'Vad vill bli tydligare för mig?',
    'Vilken är den viktigaste insikten i detta ögonblick?'
  ],
  2: [
    'Vad stöttar mig och vad håller mig tillbaka?',
    'Vad sker inom mig och vad sker omkring mig?',
    'Vad vill jag och vad behöver jag?',
    'Vad stärker mig och vad tar min energi?'
  ],
  3: [
    'Nuvarande situation – utmaning – vägledning',
    'Vad är synligt – vad är dolt – vad håller på att ta form',
    'Var jag är – vad som förändras – hur jag kan förhålla mig',
    'Rot – påverkan – integrering'
  ]
},
prompt: {
header: 'Tarotprompt – redo att kopiera',
copy: 'Kopiera',
copied: 'Kopierad ✓',
disclaimer:
'Frågan och tolkningen skapas av dig. Verktyget hjälper endast till att formulera en strukturerad tarot-prompt för reflektion eller vidare tolkning.',

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

tone:
'Tolkningen ska vara reflekterande, jordnära och stödjande – inte förutsägande eller absolut.',

summary:
'Avsluta med en kort sammanfattning av kärnbudskapet.'
}

},

en: {
page: {
title: 'Tarot Reading',
intro: 'Take a moment, form your question and draw your cards.',
questionLabel: 'Your question:',
questionPlaceholder: 'What would you like guidance on right now?',
drawButton: (count: number) => `Draw ${count} cards`,
resetButton: 'New reading',

cardCountLabel: (count: number) =>
count === 1 ? '1 card' : `${count} cards`,

progress: (flipped: number, total: number) =>
`${flipped} / ${total} cards revealed`
},
questions: {
  1: [
    'What is important to be aware of right now?',
    'What needs my attention today?',
    'What wants to be understood more clearly?',
    'What is the key insight for this moment?'
  ],
  2: [
    'What supports me and what holds me back?',
    'What is happening internally and externally?',
    'What do I want and what do I need?',
    'What strengthens me and what drains me?'
  ],
  3: [
    'Current situation – challenge – guidance',
    'What is visible – what is hidden – what is emerging',
    'Where I am – what is shifting – how to respond',
    'Root – influence – integration'
  ]
},
prompt: {
header: 'Tarot prompt – ready to copy',
copy: 'Copy',
copied: 'Copied ✓',
disclaimer:
'The question and interpretation are created by you. The tool only helps structure a tarot prompt for reflection or further interpretation.',

title: 'Tarot reading – interpretation requested',

questionIntro: 'I asked the following question:',

cardsIntro: (count: number) =>
`I drew ${count} tarot card${count > 1 ? 's' : ''}:`,

frames: {
one: `Interpret this card as an overall message connected to the question.
Focus on insight, direction and awareness rather than detailed predictions.`,

two: `Interpret the cards as two perspectives illuminating the question from different angles.
Focus on how they interact, contrast or complement each other.`,

three: `Interpret the tarot reading as a whole, not just card by card.
Focus on the overall theme, how the cards interact and what guidance is relevant to the question.`
},

tone:
'The interpretation should be reflective, grounded and supportive — not predictive or absolute.',

summary:
'End with a short summary of the core message.'
}
}
};
