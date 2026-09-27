import { SITE_NAME, TAGLINE } from "@/lib/config";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-display text-6xl uppercase">{SITE_NAME}</h1>
      <p className="font-condensed text-3xl">{TAGLINE}</p>
      <p className="font-serif text-2xl">ऐतिहासिक विकास · வரலாற்று வளர்ச்சி · చారిత్రాత్మక అభివృద్ధి · ಐತಿಹಾಸಿಕ ಅಭಿವೃದ್ಧಿ</p>
    </main>
  );
}
