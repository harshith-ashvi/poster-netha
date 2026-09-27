import { COPY, emptyPoster, newPerson, samplePoster } from "./presets";
import type { PosterData, Stickers } from "./types";

// Landing-page gallery (also used for the OG image). Placeholder silhouettes only.
const L = {
  sharma: newPerson("Sharma Ji", "CEO"),
  pinky: newPerson("Pinky Aunty", "Chief Well-Wisher"),
  manager: newPerson("Manager Sir", "Approved the PR"),
  chintu: newPerson("Chintu", "Moral Support"),
  anna: newPerson("Tech Lead Anna", "Said LGTM"),
  bunty: newPerson("Intern Bunty", "Brought Samosas"),
};
const you = (role: string) => newPerson("You", role);
const stickers = (on: Partial<Stickers>): Stickers => ({ ...emptyPoster().stickers, ...on });

export const EXAMPLES: PosterData[] = [
  { ...samplePoster(), template: "development" },
  {
    ...samplePoster(),
    template: "achievement",
    themeId: "royal-blue",
    headline: "A GREAT ACHIEVEMENT FOR THE COMMUNITY",
    bigNumber: "1 DOWNLOAD",
    achievement: "My app got its first download (it was my mom)",
    leaders: [L.sharma, L.pinky, L.manager, L.chintu, L.anna],
    hero: you("Founder, CEO, Intern"),
    heroTagline: "Visionary Leader of One Download",
    stickers: stickers({ flowerShower: true }),
  },
  {
    ...samplePoster(),
    template: "blessings",
    themeId: "crimson-red",
    headline: "DEDICATED TO THE NATION",
    achievement: "Fixed a typo in the README",
    leaders: [L.anna, L.manager, L.bunty],
    hero: you("Open Source Contributor"),
    heroTagline: "Tireless Servant of the Codebase",
    stickers: stickers({ congratsStrip: true }),
  },
  {
    ...samplePoster(),
    template: "infrastructure",
    themeId: "emerald-green",
    headline: "PROJECT COMPLETED",
    bigNumber: "30 DAYS",
    achievement: "Went to the gym every single day",
    beforeLabel: "Couch",
    afterLabel: "Treadmill",
    leaders: [L.pinky, L.chintu],
    hero: you("Fitness Minister"),
    heroTagline: "Architect of Revolutionary Leg Day Infrastructure",
    stickers: stickers({ ticker: true }),
  },
  {
    ...samplePoster(),
    template: "inauguration",
    themeId: "neon-startup",
    headline: "GRAND INAUGURATION",
    achievement: "Deployed to production on a Friday evening",
    leaders: Object.values(L),
    hero: you("Release Manager"),
    heroTagline: "Fearless Defender of the Main Branch",
    stickers: stickers({ garlands: true }),
  },
  {
    ...samplePoster(),
    template: "blessings",
    themeId: "saffron-gold",
    lang: "hi",
    headline: COPY.hi.headlines[0],
    blessingsLabel: COPY.hi.blessingsLabels[1],
    achievement: "Inbox zero, pehli baar",
    leaders: [L.sharma, L.pinky, L.chintu, L.bunty],
    hero: you("Email Warrior"),
    heroTagline: "Conqueror of 4,012 Unread Mails",
    stickers: stickers({ garlands: true, ticker: true }),
  },
];
