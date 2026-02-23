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
    'Vad är kärnan i situationen just nu?',
    'Vad behöver jag förstå djupare?',
    'Vilken energi präglar detta ögonblick?',
    'Vad vill bli medvetet i mig?'
  ],
  2: [
    'Vad stöttar mig och vad håller mig tillbaka?',
    'Vad är inre påverkan och vad är yttre påverkan?',
    'Vad vill jag och vad behöver jag?',
    'Vad är i balans och vad är i obalans?'
  ],
  3: [
    'Dåtid – Nutid – Framtid',
    'Situation – Utmaning – Vägledning',
    'Vad är synligt – Vad är dolt – Vad håller på att ta form',
    'Rot – Rörelse – Resultat'
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
    'What is the core of this situation right now?',
    'What needs deeper understanding?',
    'What energy defines this moment?',
    'What wants to become conscious within me?'
  ],
  2: [
    'What supports me and what holds me back?',
    'What is internal influence and what is external influence?',
    'What do I want and what do I need?',
    'What is in balance and what is out of balance?'
  ],
  3: [
    'Past – Present – Future',
    'Situation – Challenge – Guidance',
    'What is visible – What is hidden – What is emerging',
    'Root – Movement – Outcome'
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
