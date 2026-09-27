"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type Ref } from "react";
import { THEMES } from "@/lib/presets";
import type { PosterData, TemplateId } from "@/lib/types";
import { Blessings } from "./templates/Blessings";

export const STAGE_W = 1080;
export const STAGE_H = 1350;

// ponytail: templates not built yet fall back to Blessings (Phase 5 fills these in).
const TEMPLATES: Partial<Record<TemplateId, typeof Blessings>> = { blessings: Blessings };

// Fixed 1080x1350 stage scaled to fit its container. Export from `stageRef` (the unscaled node).
export function PosterCanvas({ data, stageRef }: { data: PosterData; stageRef?: Ref<HTMLDivElement> }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0);

  useLayoutEffect(() => {
    const box = boxRef.current!;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / STAGE_W));
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  const theme = THEMES.find((t) => t.id === data.themeId) ?? THEMES[0];
  const Template = TEMPLATES[data.template] ?? Blessings;

  return (
    <div ref={boxRef} style={{ width: "100%", aspectRatio: `${STAGE_W} / ${STAGE_H}`, overflow: "hidden" }}>
      <div style={{ transform: `scale(${k})`, transformOrigin: "0 0", visibility: k ? "visible" : "hidden" }}>
        <div
          ref={stageRef}
          role="img"
          aria-label={data.headline}
          style={{ ...(theme.vars as CSSProperties), position: "relative", width: STAGE_W, height: STAGE_H, overflow: "hidden" }}
        >
          <Template data={data} />
        </div>
      </div>
    </div>
  );
}
