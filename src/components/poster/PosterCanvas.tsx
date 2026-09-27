"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type Ref } from "react";
import { THEMES } from "@/lib/presets";
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
  const Template = TEMPLATES[data.template];

  return (
    <div ref={boxRef} style={{ position: "relative", width: "100%", aspectRatio: `${STAGE_W} / ${STAGE_H}`, overflow: "hidden" }}>
      {/* Absolute so the unscaled 1080px layer never widens the layout. */}
      <div style={{ position: "absolute", top: 0, left: 0, transform: `scale(${k})`, transformOrigin: "0 0", visibility: k ? "visible" : "hidden" }}>
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
