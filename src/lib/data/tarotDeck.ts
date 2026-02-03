// ==============================
// Tarot – domänmodell
// ==============================

export type Arcana = "Major" | "Minor";
export type Suit = "Cups" | "Stones" | "Swords" | "Wands";
export type Element = "Vatten" | "Jord" | "Luft" | "Eld";

export type TarotCardData = {
    id: string;
    shortName: string;
    fullTitle: string;
    number: number | null;
    arcana: Arcana;
    suit?: Suit;
    element: Element;
    keywords: string[];
    image: string;
};

// ==============================
// Tarotkort – komplett lek
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
        id: "major-the-magician",
        shortName: "The Magician",
        fullTitle: "The Magician – I",
        number: 1,
        arcana: "Major",
        element: "Luft",
        keywords: ["vilja", "manifestation", "fokus", "skapande"],
        image: "I_TheMagician.png"
    },

    {
        id: "major-the-high-priestess",
        shortName: "The High Priestess",
        fullTitle: "The High Priestess – II",
        number: 2,
        arcana: "Major",
        element: "Vatten",
        keywords: ["intuition", "inre visdom", "mysterium", "stillhet"],
        image: "II_TheHighPriestess.png"
    },

    {
        id: "major-the-empress",
        shortName: "The Empress",
        fullTitle: "The Empress – III",
        number: 3,
        arcana: "Major",
        element: "Jord",
        keywords: ["näring", "kreativitet", "omsorg", "överflöd"],
        image: "III_TheEmpress.png"
    },

    {
        id: "major-the-emperor",
        shortName: "The Emperor",
        fullTitle: "The Emperor – IV",
        number: 4,
        arcana: "Major",
        element: "Eld",
        keywords: ["struktur", "ledning", "stabilitet", "ansvar"],
        image: "IV_TheEmperor.png"
    },

    {
        id: "major-the-hierophant",
        shortName: "The Hierophant",
        fullTitle: "The Hierophant – V",
        number: 5,
        arcana: "Major",
        element: "Jord",
        keywords: ["tradition", "värderingar", "lära", "andlig väg"],
        image: "V_TheHierophant.png"
    },

    {
        id: "major-the-lovers",
        shortName: "The Lovers",
        fullTitle: "The Lovers – VI",
        number: 6,
        arcana: "Major",
        element: "Luft",
        keywords: ["val", "relation", "harmoni", "autenticitet"],
        image: "VI_TheLovers.png"
    },

    {
        id: "major-the-chariot",
        shortName: "The Chariot",
        fullTitle: "The Chariot – VII",
        number: 7,
        arcana: "Major",
        element: "Eld",
        keywords: ["driv", "kontroll", "framgång", "viljestyrka"],
        image: "VII_TheChariot.png"
    },

    {
        id: "major-strength",
        shortName: "Strength",
        fullTitle: "Strength – VIII",
        number: 8,
        arcana: "Major",
        element: "Eld",
        keywords: ["mod", "inre styrka", "tålamod", "medkänsla"],
        image: "VIII_Strength.png"
    },

    {
        id: "major-the-hermit",
        shortName: "The Hermit",
        fullTitle: "The Hermit – IX",
        number: 9,
        arcana: "Major",
        element: "Jord",
        keywords: ["reflektion", "ensamhet", "sökande", "insikt"],
        image: "IX_TheHermit.png"
    },

    {
        id: "major-wheel-of-fortune",
        shortName: "Wheel of Fortune",
        fullTitle: "Wheel of Fortune – X",
        number: 10,
        arcana: "Major",
        element: "Luft",
        keywords: ["cykler", "förändring", "öde", "timing"],
        image: "X_WheelOfFortune.png"
    },

    {
        id: "major-justice",
        shortName: "Justice",
        fullTitle: "Justice – XI",
        number: 11,
        arcana: "Major",
        element: "Luft",
        keywords: ["sanning", "balans", "ansvar", "klarhet"],
        image: "XI_Justice.png"
    },

    {
        id: "major-the-hanged-man",
        shortName: "The Hanged Man",
        fullTitle: "The Hanged Man – XII",
        number: 12,
        arcana: "Major",
        element: "Vatten",
        keywords: ["perspektiv", "uppoffring", "paus", "acceptans"],
        image: "XII_TheHangedMan.png"
    },

    {
        id: "major-death",
        shortName: "Death",
        fullTitle: "Death – XIII",
        number: 13,
        arcana: "Major",
        element: "Vatten",
        keywords: ["slut", "förvandling", "pånyttfödelse"],
        image: "XIII_Death_Veil.png"
    },

    {
        id: "major-Alchemy-Inner-Sun-Nocturne",
        shortName: "Alchemy",
        fullTitle: "Alchemy Inner Sun Nocturne – XIV",
        number: 14,
        arcana: "Major",
        element: "Eld",
        keywords: ["balans", "harmoni", "integration"],
        image: "XIV_Alchemy_InnerSun_Nocturne.png"
    },

    {
        id: "major-the-devil",
        shortName: "The Devil",
        fullTitle: "The Devil – XV",
        number: 15,
        arcana: "Major",
        element: "Jord",
        keywords: ["bundenhet", "beroende", "skugga"],
        image: "XV_TheDevil_MirrorOfDesire.png"
    },

    {
        id: "major-the-tower",
        shortName: "The Tower",
        fullTitle: "The Tower – XVI",
        number: 16,
        arcana: "Major",
        element: "Eld",
        keywords: ["kollaps", "sanning", "uppvaknande"],
        image: "XVI_TheTower.png"
    },

    {
        id: "major-the-star",
        shortName: "The Star",
        fullTitle: "The Star – XVII",
        number: 17,
        arcana: "Major",
        element: "Luft",
        keywords: ["hopp", "läkning", "tro"],
        image: "XVII_TheStar.png"
    },

    {
        id: "major-the-moon",
        shortName: "The Moon",
        fullTitle: "The Moon – XVIII",
        number: 18,
        arcana: "Major",
        element: "Vatten",
        keywords: ["intuition", "illusion", "drömmar"],
        image: "XVIII_TheMoon.png"
    },

    {
        id: "major-the-sun",
        shortName: "The Sun",
        fullTitle: "The Sun – XIX",
        number: 19,
        arcana: "Major",
        element: "Eld",
        keywords: ["glädje", "klarhet", "livskraft"],
        image: "XIX_TheSun.png"
    },

    {
        id: "major-the-aeon",
        shortName: "The Aeon",
        fullTitle: "The Aeon – XX",
        number: 20,
        arcana: "Major",
        element: "Luft",
        keywords: ["uppvaknande", "förlåtelse", "kallelse"],
        image: "XX_TheAeon.png"
    },

    {
        id: "major-the-universe",
        shortName: "The Universe",
        fullTitle: "The Universe – XXI",
        number: 21,
        arcana: "Major",
        element: "Jord",
        keywords: ["helhet", "fullbordan", "integration"],
        image: "XXI_TheUniverse.png"
    },

    // ---------- Minor Arcana ----------
    // Cups, Stones, Swords, Wands
    // (alla Ace–10 + Daughter/Son/Mother/Father)
];
