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

// ===== CUPS (Vatten) =====

    {
        id: "minor-ace-of-cups",
        shortName: "Ace of Cups",
        fullTitle: "Ace of Cups – In the North",
        number: 1,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["kärlek", "känsla", "öppning"],
        image: "1_AceOfCupsInTheNorth.png"
    },
    {
        id: "minor-two-of-cups",
        shortName: "Two of Cups",
        fullTitle: "Two of Cups – Love",
        number: 2,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["relation", "ömsesidighet"],
        image: "2_TwoOfCupsLove.png"
    },
    {
        id: "minor-three-of-cups",
        shortName: "Three of Cups",
        fullTitle: "Three of Cups – Overflowing",
        number: 3,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["glädje", "firande"],
        image: "3_ThreeOfCupsOverflowing.png"
    },
    {
        id: "minor-four-of-cups",
        shortName: "Four of Cups",
        fullTitle: "Four of Cups – Mixed Happiness",
        number: 4,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["ambivalens", "eftertanke"],
        image: "4_FourOfCupsMixedHappiness.png"
    },
    {
        id: "minor-five-of-cups",
        shortName: "Five of Cups",
        fullTitle: "Five of Cups – Disappointment",
        number: 5,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["sorg", "förlust"],
        image: "5_FiveOfCupsDisappointment.png"
    },
    {
        id: "minor-six-of-cups",
        shortName: "Six of Cups",
        fullTitle: "Six of Cups – Happiness",
        number: 6,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["nostalgi", "oskuldsfullhet"],
        image: "6_SixOfCupsHappiness.png"
    },
    {
        id: "minor-seven-of-cups",
        shortName: "Seven of Cups",
        fullTitle: "Seven of Cups – Illusions",
        number: 7,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["förvirring", "val"],
        image: "7_SevenOfCupsIllusionsOfSuccess.png"
    },
    {
        id: "minor-eight-of-cups",
        shortName: "Eight of Cups",
        fullTitle: "Eight of Cups – Failure",
        number: 8,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["avståndstagande", "sökande"],
        image: "8_EightOfCupsFailure.png"
    },
    {
        id: "minor-nine-of-cups",
        shortName: "Nine of Cups",
        fullTitle: "Nine of Cups – Fortune",
        number: 9,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["tillfredsställelse", "lycka"],
        image: "9_NineOfCupsFortune.png"
    },
    {
        id: "minor-ten-of-cups",
        shortName: "Ten of Cups",
        fullTitle: "Ten of Cups – Success",
        number: 10,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["harmoni", "fullbordan"],
        image: "10_TenOfCupsSuccess.png"
    },

    {
        id: "minor-daughter-of-cups",
        shortName: "Daughter of Cups",
        fullTitle: "Daughter of Cups – Brigid",
        number: 11,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["känslighet", "intuition"],
        image: "11_DaughterOfCupsInTheNorthPrincessOfCupsBrigid.png"
    },
    {
        id: "minor-son-of-cups",
        shortName: "Son of Cups",
        fullTitle: "Son of Cups – Parsival",
        number: 12,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["idealism", "romantik"],
        image: "12_SonOfCupsInTheNorthPrinceOfCupsParsival.png"
    },
    {
        id: "minor-mother-of-cups",
        shortName: "Mother of Cups",
        fullTitle: "Mother of Cups – Venus",
        number: 13,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["omsorg", "medkänsla"],
        image: "13_MotherOfCupsInTheNorthQueenOfCupsVenusOfWillendorf.png"
    },
    {
        id: "minor-father-of-cups",
        shortName: "Father of Cups",
        fullTitle: "Father of Cups – Odin",
        number: 14,
        arcana: "Minor",
        suit: "Cups",
        element: "Vatten",
        keywords: ["emotionell mognad", "visdom"],
        image: "14_FatherOfCupsInTheNorthKingOfCupsOdin.png"
    },

    // ===== WANDS (Eld) =====

    {
        id: "minor-ace-of-wands",
        shortName: "Ace of Wands",
        fullTitle: "Ace of Wands – In the East",
        number: 1,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["inspiration", "impuls", "skaparkraft"],
        image: "1_AceOfWandsInTheEast.png"
    },
    {
        id: "minor-two-of-wands",
        shortName: "Two of Wands",
        fullTitle: "Two of Wands – Dominion",
        number: 2,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["vilja", "riktning"],
        image: "2_TwoOfWandsDominion.png"
    },
    {
        id: "minor-three-of-wands",
        shortName: "Three of Wands",
        fullTitle: "Three of Wands – Virtue",
        number: 3,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["tillit", "framåtblick"],
        image: "3_ThreeOfWandsVirtue.png"
    },
    {
        id: "minor-four-of-wands",
        shortName: "Four of Wands",
        fullTitle: "Four of Wands – Perfection",
        number: 4,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["stabilitet", "grund"],
        image: "4_FourOfWandsPerfection.png"
    },
    {
        id: "minor-five-of-wands",
        shortName: "Five of Wands",
        fullTitle: "Five of Wands – Conflict",
        number: 5,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["friktion", "kamp"],
        image: "5_FiveOfWandsConflict.png"
    },
    {
        id: "minor-six-of-wands",
        shortName: "Six of Wands",
        fullTitle: "Six of Wands – Victory",
        number: 6,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["erkännande", "framgång"],
        image: "6_SixOfWandsVictory.png"
    },
    {
        id: "minor-seven-of-wands",
        shortName: "Seven of Wands",
        fullTitle: "Seven of Wands – Courage",
        number: 7,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["försvar", "integritet"],
        image: "7_SevenOfWandsCourage.png"
    },
    {
        id: "minor-eight-of-wands",
        shortName: "Eight of Wands",
        fullTitle: "Eight of Wands – Swiftness",
        number: 8,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["rörelse", "tempo"],
        image: "8_EightOfWandsSwiftness.png"
    },
    {
        id: "minor-nine-of-wands",
        shortName: "Nine of Wands",
        fullTitle: "Nine of Wands – Power",
        number: 9,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["uthållighet", "styrka"],
        image: "9_NineOfWandsPower.png"
    },
    {
        id: "minor-ten-of-wands",
        shortName: "Ten of Wands",
        fullTitle: "Ten of Wands – Oppression",
        number: 10,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["börda", "överansvar"],
        image: "10_TenOfWandsOppression.png"
    },

    {
        id: "minor-daughter-of-wands",
        shortName: "Daughter of Wands",
        fullTitle: "Daughter of Wands – Radha",
        number: 11,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["entusiasm", "utforskande"],
        image: "11_DaughterOfWandsInTheEastPrincessOfWandsRadha.png"
    },
    {
        id: "minor-son-of-wands",
        shortName: "Son of Wands",
        fullTitle: "Son of Wands – Krishna",
        number: 12,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["driv", "vision"],
        image: "12_SonOfWandsInTheEastPrinceOfWandsKrishna.png"
    },
    {
        id: "minor-mother-of-wands",
        shortName: "Mother of Wands",
        fullTitle: "Mother of Wands – Kali",
        number: 13,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["kraft", "självsäkerhet"],
        image: "13_MotherOfWandsInTheEastQueenOfWandsKali.png"
    },
    {
        id: "minor-father-of-wands",
        shortName: "Father of Wands",
        fullTitle: "Father of Wands – Brahma",
        number: 14,
        arcana: "Minor",
        suit: "Wands",
        element: "Eld",
        keywords: ["ledarskap", "skapelse"],
        image: "14_FatherOfWandsInTheEastKingOfWandsBrahma.png"
    },

    // ===== STONES (Jord) =====

    {
        id: "minor-ace-of-stones",
        shortName: "Ace of Stones",
        fullTitle: "Ace of Stones – In the West",
        number: 1,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["potential", "materia"],
        image: "1_AceOfStonesInTheWest.png"
    },
    {
        id: "minor-two-of-stones",
        shortName: "Two of Stones",
        fullTitle: "Two of Stones – Harmony",
        number: 2,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["balans", "flöde"],
        image: "2_TwoOfStonesHarmony.png"
    },
    {
        id: "minor-three-of-stones",
        shortName: "Three of Stones",
        fullTitle: "Three of Stones – Work",
        number: 3,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["samverkan", "hantverk"],
        image: "3_ThreeOfStonesWork.png"
    },
    {
        id: "minor-four-of-stones",
        shortName: "Four of Stones",
        fullTitle: "Four of Stones – Power of the Earth",
        number: 4,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["kontroll", "trygghet"],
        image: "4_FourOfStonesThePowerOfTheEarth.png"
    },
    {
        id: "minor-five-of-stones",
        shortName: "Five of Stones",
        fullTitle: "Five of Stones – Material Difficulty",
        number: 5,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["brist", "prövning"],
        image: "5_FiveOfStonesMaterialDifficulty.png"
    },
    {
        id: "minor-six-of-stones",
        shortName: "Six of Stones",
        fullTitle: "Six of Stones – Success",
        number: 6,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["belöning", "utbyte"],
        image: "6_SixOfStonesSuccess.png"
    },
    {
        id: "minor-seven-of-stones",
        shortName: "Seven of Stones",
        fullTitle: "Seven of Stones – Failure",
        number: 7,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["otålighet", "tvivel"],
        image: "7_SevenOfStonesFailure.png"
    },
    {
        id: "minor-eight-of-stones",
        shortName: "Eight of Stones",
        fullTitle: "Eight of Stones – Knowledge",
        number: 8,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["förfining", "fokus"],
        image: "8_EightOfStonesKnowledge.png"
    },
    {
        id: "minor-nine-of-stones",
        shortName: "Nine of Stones",
        fullTitle: "Nine of Stones – Material Gain",
        number: 9,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["självständighet", "överflöd"],
        image: "9_NineOfStonesMaterialGain.png"
    },
    {
        id: "minor-ten-of-stones",
        shortName: "Ten of Stones",
        fullTitle: "Ten of Stones – Richness",
        number: 10,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["arv", "stabilitet"],
        image: "10_TenOfStonesRichness.png"
    },

    {
        id: "minor-daughter-of-stones",
        shortName: "Daughter of Stones",
        fullTitle: "Daughter of Stones – Princess of Stones",
        number: 11,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["lärande", "tålamod"],
        image: "11_DaughterOfStonesInTheWestPrincessOfStones.png"
    },
    {
        id: "minor-son-of-stones",
        shortName: "Son of Stones",
        fullTitle: "Son of Stones – Prince of Stones",
        number: 12,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["ansvar", "uthållighet"],
        image: "12_SonOfStonesInTheWestPrinceOfStones.png"
    },
    {
        id: "minor-mother-of-stones",
        shortName: "Mother of Stones",
        fullTitle: "Mother of Stones – Queen of Stones",
        number: 13,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["trygghet", "närvaro"],
        image: "13_MotherOfStonesInTheWestQueenOfStones.png"
    },
    {
        id: "minor-father-of-stones",
        shortName: "Father of Stones",
        fullTitle: "Father of Stones – King of Stones",
        number: 14,
        arcana: "Minor",
        suit: "Stones",
        element: "Jord",
        keywords: ["auktoritet", "stabilitet"],
        image: "14_FatherOfStonesInTheWestKingOfStones.png"
    },

    // ===== SWORDS (Luft) =====

    {
        id: "minor-ace-of-swords",
        shortName: "Ace of Swords",
        fullTitle: "Ace of Swords – In the South",
        number: 1,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["klarhet", "sanning"],
        image: "1_AceOfSwordsInTheSouth.png"
    },
    {
        id: "minor-two-of-swords",
        shortName: "Two of Swords",
        fullTitle: "Two of Swords – Peace",
        number: 2,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["balans", "stillhet"],
        image: "2_TwoOfSwordsPeace.png"
    },
    {
        id: "minor-three-of-swords",
        shortName: "Three of Swords",
        fullTitle: "Three of Swords – Mourning",
        number: 3,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["sorg", "smärta"],
        image: "3_ThreeOfSwordsMourning.png"
    },
    {
        id: "minor-four-of-swords",
        shortName: "Four of Swords",
        fullTitle: "Four of Swords – Truce",
        number: 4,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["vila", "återhämtning"],
        image: "4_FourOfSwordsTruce.png"
    },
    {
        id: "minor-five-of-swords",
        shortName: "Five of Swords",
        fullTitle: "Five of Swords – Defeat",
        number: 5,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["förlust", "ego"],
        image: "5_FiveOfSwordsDefeat.png"
    },
    {
        id: "minor-six-of-swords",
        shortName: "Six of Swords",
        fullTitle: "Six of Swords – Science",
        number: 6,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["analys", "övergång"],
        image: "6_SixOfSwordsScience.png"
    },
    {
        id: "minor-seven-of-swords",
        shortName: "Seven of Swords",
        fullTitle: "Seven of Swords – Uselessness",
        number: 7,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["tvivel", "undvikande"],
        image: "7_SevenOfSwordsUselessness.png"
    },
    {
        id: "minor-eight-of-swords",
        shortName: "Eight of Swords",
        fullTitle: "Eight of Swords – Interference",
        number: 8,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["begränsning", "mental låsning"],
        image: "8_EightOfSwordsInterference.png"
    },
    {
        id: "minor-nine-of-swords",
        shortName: "Nine of Swords",
        fullTitle: "Nine of Swords – Cruelty",
        number: 9,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["ångest", "oro"],
        image: "9_NineOfSwordsCruelty.png"
    },
    {
        id: "minor-ten-of-swords",
        shortName: "Ten of Swords",
        fullTitle: "Ten of Swords – Ruin",
        number: 10,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["kollaps", "slutpunkt"],
        image: "10_TenOfSwordsRuin.png"
    },

    {
        id: "minor-daughter-of-swords",
        shortName: "Daughter of Swords",
        fullTitle: "Daughter of Swords – Princess of Swords",
        number: 11,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["nyfikenhet", "skärpa"],
        image: "11_DaughterOfSwordsInTheSouthPrincessOfSwords.png"
    },
    {
        id: "minor-son-of-swords",
        shortName: "Son of Swords",
        fullTitle: "Son of Swords – Prince of Swords",
        number: 12,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["intellekt", "snabbhet"],
        image: "12_SonOfSwordsInTheSouthPrinceOfSwordsOsiris.png"
    },
    {
        id: "minor-mother-of-swords",
        shortName: "Mother of Swords",
        fullTitle: "Mother of Swords – Queen of Swords",
        number: 13,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["klarhet", "ärlighet"],
        image: "13_MotherOfSwordsInTheSouthQueenOfSwordsNut.png"
    },
    {
        id: "minor-father-of-swords",
        shortName: "Father of Swords",
        fullTitle: "Father of Swords – King of Swords",
        number: 14,
        arcana: "Minor",
        suit: "Swords",
        element: "Luft",
        keywords: ["auktoritet", "logik"],
        image: "14_FatherOfSwordsInTheSouthKingOfSwordsRa.png"
    },

];
