import type { Metadata } from "next";
import {
  Anton,
  Noto_Sans_Devanagari,
  Noto_Sans_Kannada,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Poppins,
  Rozha_One,
  Teko,
} from "next/font/google";
import { DESCRIPTION, SITE_NAME, SITE_URL, TAGLINE } from "@/lib/config";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const teko = Teko({ subsets: ["latin"], variable: "--font-teko" });
const rozha = Rozha_One({ weight: "400", subsets: ["latin"], variable: "--font-rozha" });
const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"], variable: "--font-poppins" });
// Indic scripts are only needed for captions, so skip preloading them on every page load.
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-hi", preload: false });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-ta", preload: false });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], variable: "--font-te", preload: false });
const kannada = Noto_Sans_Kannada({ subsets: ["kannada"], variable: "--font-kn", preload: false });

const fontVars = [anton, teko, rozha, poppins, devanagari, tamil, telugu, kannada]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}: ${TAGLINE}`, template: `%s · ${SITE_NAME}` },
  description: DESCRIPTION,
  openGraph: { siteName: SITE_NAME, type: "website", title: `${SITE_NAME}: ${TAGLINE}`, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: `${SITE_NAME}: ${TAGLINE}`, description: DESCRIPTION },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
