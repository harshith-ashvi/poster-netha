export type TemplateId =
  | "blessings"
  | "inauguration"
  | "achievement"
  | "development"
  | "infrastructure";

export type Lang = "en" | "hi" | "ta" | "te" | "kn";

export interface Theme {
  id: string;
  name: string;
  vars: Record<string, string>; // applied as inline style on the poster stage
}

export interface Person {
  id: string;
  name: string;
  role: string;
  photo?: string; // data URL
  zoom: number; // 1 to 3
  offsetX: number; // -50 to 50 (%)
  offsetY: number;
}

export interface Stickers {
  garlands: boolean;
  flowerShower: boolean;
  congratsStrip: boolean;
  ticker: boolean;
}

export interface PosterData {
  template: TemplateId;
  lang: Lang;
  themeId: string;
  headline: string;
  achievement: string;
  bigNumber: string;
  blessingsLabel: string;
  leaders: Person[]; // 0 to 6
  hero: Person;
  heroTagline: string;
  beforeImage?: string;
  afterImage?: string;
  beforeLabel: string;
  afterLabel: string;
  footerText: string;
  showWatermark: boolean;
  stickers: Stickers;
}
