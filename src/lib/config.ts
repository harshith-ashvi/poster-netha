export const SITE_NAME = "Vikas Ho Gaya";
export const TAGLINE = "Celebrate anything like an Indian politician";
export const DESCRIPTION =
  "Turn your tiniest win into a giant, over-the-top political-style flex banner. Parody. Photos never leave your device.";
export const WATERMARK = `made with ${SITE_NAME}`;
export const DISCLAIMER = "Parody. Not affiliated with any political party. Photos never leave your device.";

// Absolute base for OG/Twitter image URLs. Set NEXT_PUBLIC_SITE_URL once there's a custom domain;
// on Vercel it falls back to the project's production URL (a build-time system env var).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const SOCIAL = {
  x: "https://x.com/HarshithAshvi",
  instagram: "https://www.instagram.com/astroashvi.mp4/",
};
