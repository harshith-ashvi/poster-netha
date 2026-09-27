import Link from "next/link";
import { PosterCanvas } from "@/components/poster/PosterCanvas";
import { DISCLAIMER, SITE_NAME } from "@/lib/config";
import { EXAMPLES } from "@/lib/examples";

// Hero fan: three posters pasted up like flex banners on a wall.
const FAN = [EXAMPLES[2], EXAMPLES[0], EXAMPLES[1]];

// Poster sizes come from --poster-k (scale of the 1080px stage) per breakpoint, so these
// thumbnails render from plain HTML with no JS measuring.
const FAN_ITEM = [
  "top-[20px] -translate-x-[calc(50%+44%)] -rotate-9",
  "top-0 z-1 -translate-x-1/2",
  "top-[20px] translate-x-[calc(-50%+44%)] rotate-8",
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto w-full max-w-6xl px-4 py-4">
        <span className="font-display text-2xl uppercase text-[#7a0a0a]">{SITE_NAME}</span>
      </header>

      <main className="flex-1 overflow-x-clip">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pt-6 pb-16 md:grid-cols-[1.05fr_1fr] md:pt-12">
          <div className="flex flex-col items-start gap-6">
            <h1 className="font-display text-[clamp(46px,7.5vw,88px)] leading-[0.92] uppercase text-[#7a0a0a]">
              Celebrate anything like an Indian politician
            </h1>
            <p className="max-w-[46ch] text-lg leading-relaxed text-[#3d2a14]">
              Your tiniest win deserves a flex banner the size of a building. Add your face, your “leaders” and your
              achievement, then download a poster the whole colony will talk about.
            </p>
            <Link
              href="/create"
              className="rounded-lg bg-[#b3001b] px-8 py-4 font-display text-2xl uppercase text-[#ffe27a] shadow-[0_6px_0_#6b0010] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_#6b0010] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#b3001b]"
            >
              Make your poster
            </Link>
            <p className="text-sm text-[#7a6440]">Free. No sign-up. Photos never leave your device.</p>
          </div>

          <div
            className="relative flex h-[calc(var(--poster-k)*1350px+40px)] justify-center [--poster-k:0.2] sm:[--poster-k:0.26] min-[56.25rem]:[--poster-k:0.3]"
            aria-hidden
          >
            {FAN.map((d, i) => (
              <div key={i} className={`absolute left-1/2 shadow-[0_14px_30px_rgba(90,30,0,0.35)] ${FAN_ITEM[i]}`}>
                <PosterCanvas data={d} cssScale />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#7a0a0a] py-14 text-[#fff6d6]">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="font-display text-[clamp(32px,5vw,56px)] leading-none uppercase text-[#ffe27a]">
              Historic achievements, already celebrated
            </h2>
            <p className="mt-3 max-w-[60ch] text-[#f3dcae]">
              Five templates, five languages, and absolutely no sense of proportion.
            </p>
            <ul className="mt-8 grid grid-cols-[repeat(2,max-content)] justify-center gap-x-3 gap-y-4 [--poster-k:0.15] sm:gap-6 sm:[--poster-k:0.25] min-[56.25rem]:grid-cols-[repeat(3,max-content)] min-[56.25rem]:[--poster-k:0.22] min-[68.75rem]:gap-7 min-[68.75rem]:[--poster-k:0.3]">
              {EXAMPLES.map((d, i) => (
                <li key={i} className="shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                  <PosterCanvas data={d} cssScale />
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <Link
                href="/create"
                className="rounded-lg bg-[#ffd23f] px-8 py-4 font-display text-2xl uppercase text-[#5a0000] shadow-[0_6px_0_#a86f00] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_#a86f00] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#ffd23f]"
              >
                Make yours
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-[#7a6440]">{DISCLAIMER}</footer>
    </div>
  );
}
