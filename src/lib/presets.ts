import type { Lang, Person, PosterData, TemplateId, Theme } from "./types";

export const TEMPLATES: { id: TemplateId; name: string }[] = [
  { id: "blessings", name: "Blessings" },
  { id: "inauguration", name: "Inauguration" },
  { id: "achievement", name: "Achievement" },
  { id: "development", name: "Development" },
  { id: "infrastructure", name: "Infrastructure" },
];

// --bg-from/--bg-to: background gradient, --accent: gold/trim, --text: main text, --plate: name plates
export const THEMES: Theme[] = [
  {
    id: "saffron-gold",
    name: "Saffron Gold",
    vars: { "--bg-from": "#ff7a00", "--bg-to": "#ffd23f", "--accent": "#f5c542", "--text": "#7a0a0a", "--plate": "#b30000" },
  },
  {
    id: "royal-blue",
    name: "Royal Blue",
    vars: { "--bg-from": "#0b1f6b", "--bg-to": "#2f6bff", "--accent": "#ffd23f", "--text": "#ffffff", "--plate": "#c8102e" },
  },
  {
    id: "emerald-green",
    name: "Emerald Green",
    vars: { "--bg-from": "#04471c", "--bg-to": "#1fbf5f", "--accent": "#ffd23f", "--text": "#ffffff", "--plate": "#7a0a0a" },
  },
  {
    id: "crimson-red",
    name: "Crimson Red",
    vars: { "--bg-from": "#5c0000", "--bg-to": "#e3001b", "--accent": "#ffd23f", "--text": "#fff6d6", "--plate": "#1a1a1a" },
  },
  {
    id: "neon-startup",
    name: "Neon Startup",
    vars: { "--bg-from": "#1a0b3d", "--bg-to": "#7b2ff7", "--accent": "#00f0ff", "--text": "#ffffff", "--plate": "#ff2bd6" },
  },
];

type Copy = { name: string; headlines: string[]; blessingsLabels: string[]; congrats: string; breaking: string };

export const COPY: Record<Lang, Copy> = {
  en: {
    name: "English",
    congrats: "CONGRATULATIONS",
    breaking: "BREAKING",
    headlines: [
      "HISTORIC DEVELOPMENT",
      "A GREAT ACHIEVEMENT FOR THE COMMUNITY",
      "GRAND INAUGURATION",
      "SUCCESSFULLY COMPLETED",
      "PROUD MOMENT FOR THE NATION",
    ],
    blessingsLabels: [
      "With the blessings of",
      "Under the visionary leadership of",
      "With the guidance of",
      "Inspired by",
    ],
  },
  hi: {
    name: "हिन्दी",
    congrats: "हार्दिक बधाई",
    breaking: "ताज़ा ख़बर",
    headlines: ["ऐतिहासिक विकास", "समाज के लिए एक महान उपलब्धि", "भव्य उद्घाटन", "सफलतापूर्वक संपन्न", "राष्ट्र के लिए गौरव का क्षण"],
    blessingsLabels: ["के आशीर्वाद से", "के दूरदर्शी नेतृत्व में", "के मार्गदर्शन में", "से प्रेरित"],
  },
  ta: {
    name: "தமிழ்",
    congrats: "வாழ்த்துக்கள்",
    breaking: "முக்கிய செய்தி",
    headlines: ["வரலாற்று வளர்ச்சி", "சமூகத்திற்கு ஒரு மாபெரும் சாதனை", "பிரம்மாண்ட திறப்பு விழா", "வெற்றிகரமாக நிறைவு", "தேசத்திற்கு பெருமையான தருணம்"],
    blessingsLabels: ["ஆசியுடன்", "தொலைநோக்கு தலைமையில்", "வழிகாட்டுதலுடன்", "ஈர்க்கப்பட்டு"],
  },
  te: {
    name: "తెలుగు",
    congrats: "అభినందనలు",
    breaking: "తాజా వార్త",
    headlines: ["చారిత్రాత్మక అభివృద్ధి", "సమాజానికి గొప్ప విజయం", "ఘన ప్రారంభోత్సవం", "విజయవంతంగా పూర్తయింది", "దేశానికి గర్వకారణమైన క్షణం"],
    blessingsLabels: ["ఆశీస్సులతో", "దార్శనిక నాయకత్వంలో", "మార్గదర్శకత్వంలో", "స్ఫూర్తితో"],
  },
  kn: {
    name: "ಕನ್ನಡ",
    congrats: "ಅಭಿನಂದನೆಗಳು",
    breaking: "ತಾಜಾ ಸುದ್ದಿ",
    headlines: ["ಐತಿಹಾಸಿಕ ಅಭಿವೃದ್ಧಿ", "ಸಮುದಾಯಕ್ಕೆ ಮಹಾನ್ ಸಾಧನೆ", "ಭವ್ಯ ಉದ್ಘಾಟನೆ", "ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ", "ರಾಷ್ಟ್ರಕ್ಕೆ ಹೆಮ್ಮೆಯ ಕ್ಷಣ"],
    blessingsLabels: ["ಆಶೀರ್ವಾದದೊಂದಿಗೆ", "ದೂರದೃಷ್ಟಿಯ ನಾಯಕತ್ವದಲ್ಲಿ", "ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ", "ಸ್ಫೂರ್ತಿಯಿಂದ"],
  },
};

export const HERO_TAGLINES = [
  "Architect of Revolutionary UI Infrastructure",
  "Tireless Servant of the Codebase",
  "Visionary Leader of One Download",
];

export const FOOTER_TEXT = "Best wishes from the well-wishers and supporters of ...";

export const MAX_LEADERS = 6;

const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export function randomCopy(lang: Lang): Partial<PosterData> {
  return {
    headline: pick(COPY[lang].headlines),
    blessingsLabel: pick(COPY[lang].blessingsLabels),
    heroTagline: pick(HERO_TAGLINES),
  };
}

export function newPerson(name = "", role = ""): Person {
  return { id: crypto.randomUUID(), name, role, zoom: 1, offsetX: 0, offsetY: 0 };
}

export function emptyPoster(): PosterData {
  return {
    template: "blessings",
    lang: "en",
    themeId: THEMES[0].id,
    headline: COPY.en.headlines[0],
    achievement: "",
    bigNumber: "",
    blessingsLabel: COPY.en.blessingsLabels[0],
    leaders: [],
    hero: newPerson(),
    heroTagline: "",
    beforeLabel: "",
    afterLabel: "",
    footerText: FOOTER_TEXT,
    showWatermark: true,
    stickers: { garlands: false, flowerShower: false, congratsStrip: false, ticker: false },
  };
}

export function samplePoster(): PosterData {
  return {
    ...emptyPoster(),
    headline: "HISTORIC DEVELOPMENT",
    achievement: "Button background changed from #000 to #F59E0B",
    bigNumber: "1 DOWNLOAD",
    leaders: [
      newPerson("Sharma Ji", "CEO"),
      newPerson("Priya", "Design Lead"),
      newPerson("Ravi", "Scrum Master"),
      newPerson("Aunty Ji", "Chief Well-Wisher"),
    ],
    hero: newPerson("You", "Frontend Engineer"),
    heroTagline: HERO_TAGLINES[0],
    beforeLabel: "#000",
    afterLabel: "#F59E0B",
  };
}

// Switching language swaps preset copy to the same slot in the new language, but never overwrites text the user typed.
export function copyForLang(data: PosterData, lang: Lang): Partial<PosterData> {
  const swap = (value: string, key: "headlines" | "blessingsLabels") => {
    for (const l of Object.keys(COPY) as Lang[]) {
      const i = COPY[l][key].indexOf(value);
      if (i !== -1) return COPY[lang][key][i];
    }
    return value;
  };
  return { lang, headline: swap(data.headline, "headlines"), blessingsLabel: swap(data.blessingsLabel, "blessingsLabels") };
}
