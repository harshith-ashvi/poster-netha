"use client";

import { useDeferredValue, useReducer, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { PosterCanvas } from "@/components/poster/PosterCanvas";
import { DISCLAIMER, SITE_NAME } from "@/lib/config";
import { emptyPoster, samplePoster } from "@/lib/presets";
import { posterReducer } from "@/lib/reducer";
import { BeforeAfterFields } from "./BeforeAfterFields";
import { CopyTools } from "./CopyTools";
import { ExportBar } from "./ExportBar";
import { LeaderList } from "./LeaderList";
import { StickerToggles } from "./StickerToggles";
import { TemplatePicker } from "./TemplatePicker";
import { HeroFields, TextFields } from "./TextFields";
import { ThemePicker } from "./ThemePicker";
import { btnCls, Section } from "./ui";

export function Editor() {
  const [data, dispatch] = useReducer(posterReducer, undefined, samplePoster);
  // Poster re-renders at lower priority so typing stays snappy.
  const preview = useDeferredValue(data);
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    // App shell: exactly one viewport tall, so the page never scrolls. Header and preview stay put;
    // only the inputs column scrolls.
    <div className="relative mx-auto flex h-dvh w-full max-w-6xl flex-col overflow-hidden">
      <header className="flex flex-none items-center justify-between gap-3 border-b border-[#ecdcb4] px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-1.5 font-display text-2xl uppercase text-[#7a0a0a]">
          <ArrowLeft size={20} aria-hidden />
          {SITE_NAME}
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            className={btnCls}
            aria-label="Load sample"
            onClick={() => confirm("Replace everything with the sample poster?") && dispatch({ type: "merge", patch: samplePoster() })}
          >
            <Sparkles size={16} aria-hidden />
            <span className="hidden sm:inline">Load sample</span>
          </button>
          <button
            type="button"
            className={btnCls}
            aria-label="Start over"
            onClick={() => confirm("Clear everything and start from a blank poster?") && dispatch({ type: "merge", patch: emptyPoster() })}
          >
            <RotateCcw size={16} aria-hidden />
            <span className="hidden sm:inline">Start over</span>
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)] md:gap-8 md:px-4">
        {/* Preview: fixed in place. Mobile gets ~45% of the screen so the inputs stay reachable. */}
        <div className="flex h-[45svh] flex-none flex-col px-4 py-3 md:h-auto md:min-h-0 md:px-0 md:py-6">
          {/* Size container: the poster takes the largest 4:5 box that fits both width and height. */}
          <div className="flex min-h-0 flex-1 justify-center [container-type:size]">
            <div className="w-[min(100cqw,calc(100cqh*0.8))] self-start shadow-[0_12px_30px_rgba(90,40,0,0.25)]">
              <PosterCanvas data={preview} stageRef={stageRef} />
            </div>
          </div>
          <ExportBar stageRef={stageRef} headline={data.headline} />
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-32 md:px-0 md:py-4 md:pr-2 md:pb-8">
          <Section title="Template" open>
            <TemplatePicker template={data.template} themeId={data.themeId} dispatch={dispatch} />
          </Section>
          <Section title="Words" open>
            <CopyTools data={data} dispatch={dispatch} />
            <TextFields data={data} dispatch={dispatch} />
          </Section>
          <Section title="You, the hero">
            <HeroFields data={data} dispatch={dispatch} />
          </Section>
          <Section title={`Leaders (${data.leaders.length}/6)`}>
            <LeaderList data={data} dispatch={dispatch} />
          </Section>
          <Section title="Before and after">
            <BeforeAfterFields data={data} dispatch={dispatch} />
          </Section>
          <Section title="Colours">
            <ThemePicker themeId={data.themeId} dispatch={dispatch} />
          </Section>
          <Section title="Stickers">
            <StickerToggles stickers={data.stickers} dispatch={dispatch} />
          </Section>
          <p className="pt-4 text-xs text-[#7a6440]">{DISCLAIMER}</p>
        </div>
      </div>
    </div>
  );
}
