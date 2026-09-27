import { COPY } from "@/lib/presets";
import type { PosterData } from "@/lib/types";

// ---------- Toran: marigold swags across the top ----------
const SWAGS = 4;
const SWAG_W = 1080 / SWAGS;
const FLOWERS = Array.from({ length: SWAGS }, (_, k) =>
  Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    const x0 = k * SWAG_W;
    // quadratic from (x0,6) via (x0+W/2,84) to (x0+W,6): dips to ~45px
    const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * (x0 + SWAG_W / 2) + t * t * (x0 + SWAG_W);
    const y = (1 - t) ** 2 * 6 + 2 * (1 - t) * t * 84 + t * t * 6;
    return { x: x.toFixed(0), y: y.toFixed(0), c: i % 2 ? "#ffc21a" : "#ff8a00" };
  }),
).flat();

function Toran() {
  return (
    <svg className="absolute top-0 left-0" viewBox="0 0 1080 70" width="1080" height="70" aria-hidden>
      {Array.from({ length: SWAGS + 1 }, (_, k) => (
        <g key={k} fill="#2e8b3a" stroke="#1b5e20" strokeWidth="1.5">
          <ellipse cx={k * SWAG_W - 9} cy="22" rx="7" ry="18" transform={`rotate(12 ${k * SWAG_W - 9} 22)`} />
          <ellipse cx={k * SWAG_W + 9} cy="22" rx="7" ry="18" transform={`rotate(-12 ${k * SWAG_W + 9} 22)`} />
        </g>
      ))}
      {FLOWERS.map((f, i) => (
        <g key={i}>
          <circle cx={f.x} cy={f.y} r="13" fill={f.c} stroke="#c25400" strokeWidth="1.5" />
          <circle cx={f.x} cy={f.y} r="5" fill="#fff1a8" />
        </g>
      ))}
    </svg>
  );
}

// ---------- Flower shower: deterministic petals (same every render, so preview == export) ----------
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const PETAL_COLORS = ["#ff8a00", "#ffc21a", "#e8175d", "#ff5e8a", "#fff1a8"];
const PETALS = Array.from({ length: 70 }, () => ({
  x: (rand() * 1080).toFixed(0),
  y: (rand() ** 1.4 * 1350).toFixed(0), // denser near the top, like they're still falling
  r: (rand() * 360).toFixed(0),
  s: (0.7 + rand() * 0.8).toFixed(2),
  c: PETAL_COLORS[Math.floor(rand() * PETAL_COLORS.length)],
}));

function Petals() {
  return (
    <svg className="absolute inset-0" viewBox="0 0 1080 1350" width="1080" height="1350" aria-hidden>
      {PETALS.map((p, i) => (
        <ellipse key={i} rx="11" ry="6" fill={p.c} opacity="0.92" transform={`translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})`} />
      ))}
    </svg>
  );
}

// Overlay stickers drawn above any template. (The ticker lives in Footer so it takes real space.)
export function Stickers({ data }: { data: PosterData }) {
  const { garlands, flowerShower, congratsStrip } = data.stickers;
  if (!garlands && !flowerShower && !congratsStrip) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-60">
      {flowerShower && <Petals />}
      {congratsStrip && (
        <div className="absolute top-0 right-0 size-[400px] overflow-hidden">
          <div className="absolute top-[104px] -right-[150px] w-[620px] rotate-45 border-y-5 border-(--accent) bg-[linear-gradient(180deg,color-mix(in_srgb,var(--plate)_80%,white),var(--plate)_50%,color-mix(in_srgb,var(--plate)_70%,black))] pt-[8px] pb-[6px] text-center font-display text-[36px] leading-[1.1] whitespace-nowrap text-[#ffe27a]">{COPY[data.lang].congrats}</div>
        </div>
      )}
      {garlands && <Toran />}
    </div>
  );
}
