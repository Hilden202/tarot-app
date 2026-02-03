// ==============================
// Tarot – domänmodell
// ==============================

export type Arcana = "Major" | "Minor";
export type Suit = "Cups" | "Stones" | "Swords" | "Wands";
export type Element = "Vatten" | "Jord" | "Luft" | "Eld";

export type TarotCardData = {
    id: string;              // stabilt ID (för UI, DB, relationer)
    shortName: string;       // t.ex. "The Moon"
    fullTitle: string;       // t.ex. "The Moon – XVIII"
    number: number | null;   // Major: 0–21, Minor: 1–14
    arcana: Arcana;
    suit?: Suit;             // endast Minor Arcana
    element: Element;
    keywords: string[];      // används i prompt & filtrering
    image: string;           // filnamn eller path
};

// ==============================
// Tarotkort – datakälla (MVP)
// ==============================

export const tarotDeck: TarotCardData[] = [

    // ---------- Major Arcana ----------

    {
        id: "major-the-fool",
        shortName: "The Fool",
        fullTitle: "The Fool – 0",
        number: 0,
        arcana: "Major",
        element: "Luft",
        keywords: ["början", "frihet", "tillit", "språng", "potential"],
        image: "0_TheFool.png"
    },

    {
        id: "major-the-moon",
        shortName: "The Moon",
        fullTitle: "The Moon – XVIII",
        number: 18,
        arcana: "Major",
        element: "Vatten",
        keywords: ["intuition", "illusion", "undermedvetna", "drömmar", "rädsla"],
        image: "XVIII_TheMoon.png"
    },

    {
        id: "major-the-tower",
        shortName: "The Tower",
        fullTitle: "The Tower – XVI",
        number: 16,
        arcana: "Major",
        element: "Eld",
        keywords: ["kollaps", "sanning", "plötslig förändring", "uppvaknande"],
        image: "XVI_TheTower.png"
    },

    {
        id: "major-the-wheel-of-fortune",
        shortName: "The Wheel of Fortune",
        fullTitle: "The Wheel of Fortune – X",
        number: 10,
        arcana: "Major",
        element: "Luft",
        keywords: ["cykler", "förändring", "öde", "flöde", "timing"],
        image: "X_WheelOfFortune.png"
    },

    // ---------- Cups (Vatten) ----------

    {
        id: "cups-six",
        shortName: "Six of Cups",
        fullTitle: "Happiness – Six of Cups",
        number: 6,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["minnen", "glädje", "barndom", "oskuldsfullhet", "nostalgi"],
        image: "6_SixOfCupsHappiness.png"
    },

    // ---------- Stones (Jord) ----------

    {
        id: "stones-ten",
        shortName: "Ten of Stones",
        fullTitle: "Wealth – Ten of Stones",
        number: 10,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["trygghet", "stabilitet", "familj", "överflöd", "arv"],
        image: "10_TenOfStonesRichness.png"
    },

    // ---------- Swords (Luft) ----------

    {
        id: "swords-eight",
        shortName: "Eight of Swords",
        fullTitle: "Interference – Eight of Swords",
        number: 8,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["självbegränsning", "oro", "illusion", "rädsla", "insikt"],
        image: "8_EightOfSwordsInterference.png"
    },

    // ---------- Wands (Eld) ----------

    {
        id: "wands-son-east",
        shortName: "Son of Wands in the East",
        fullTitle: "Prince of Wands – Son of Wands in the East (Krishna)",
        number: 12,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["energi", "passion", "rörelse", "inspiration", "vilja"],
        image: "12_SonOfWandsInTheEastPrinceOfWandsKrishna.png"
    }
];
