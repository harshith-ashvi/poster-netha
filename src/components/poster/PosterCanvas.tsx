"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type Ref } from "react";
import { THEMES } from "@/lib/presets";
import { Stickers } from "./parts/Stickers";
import type { PosterData, TemplateId } from "@/lib/types";
import { Achievement } from "./templates/Achievement";
import { Blessings } from "./templates/Blessings";
import { Development } from "./templates/Development";
import { Inauguration } from "./templates/Inauguration";
import { Infrastructure } from "./templates/Infrastructure";

export const STAGE_W = 1080;
export const STAGE_H = 1350;

const TEMPLATES: Record<TemplateId, typeof Blessings> = {
  blessings: Blessings,
  inauguration: Inauguration,
  achievement: Achievement,
  development: Development,
  infrastructure: Infrastructure,
};

// Fixed 1080x1350 stage scaled to fit its container. Export from `stageRef` (the unscaled node).
// `cssScale`: size comes from the `--poster-k` CSS variable instead of measuring, so static
// thumbnails (landing gallery) render straight from HTML with no JS.
export function PosterCanvas({ data, stageRef, cssScale }: { data: PosterData; stageRef?: Ref<HTMLDivElement>; cssScale?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0);

  useLayoutEffect(() => {
    if (cssScale) return;
    const box = boxRef.current!;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / STAGE_W));
    ro.observe(box);
    return () => ro.disconnect();
  }, [cssScale]);

  const theme = THEMES.find((t) => t.id === data.themeId) ?? THEMES[0];
  const Template = TEMPLATES[data.template];

  return (
    <div ref={boxRef} style={{ position: "relative", width: cssScale ? `calc(var(--poster-k) * ${STAGE_W}px)` : "100%", aspectRatio: `${STAGE_W} / ${STAGE_H}`, overflow: "hidden" }}>
      {/* Absolute so the unscaled 1080px layer never widens the layout. */}
      <div style={{ position: "absolute", top: 0, left: 0, transform: cssScale ? "scale(var(--poster-k))" : `scale(${k})`, transformOrigin: "0 0", visibility: cssScale || k ? "visible" : "hidden" }}>
        <div
          ref={stageRef}
          role="img"
          lang={data.lang}
          aria-label={data.headline}
          style={{ ...(theme.vars as CSSProperties), position: "relative", width: STAGE_W, height: STAGE_H, overflow: "hidden" }}
        >
          <Template data={data} />
          <Stickers data={data} />
        </div>
      </div>
    </div>
  );
}
