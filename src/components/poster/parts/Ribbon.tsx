import type { ReactNode } from "react";

// Folded tails are ::before/::after triangles; `isolate` keeps their -z-1 behind the ribbon, not the poster.
const tail =
  "before:absolute before:top-[14px] before:-left-[42px] before:-z-1 before:border-[30px] before:border-[color:color-mix(in_srgb,var(--plate)_65%,black)] before:border-l-transparent " +
  "after:absolute after:top-[14px] after:-right-[42px] after:-z-1 after:border-[30px] after:border-[color:color-mix(in_srgb,var(--plate)_65%,black)] after:border-r-transparent";

export function Ribbon({ children }: { children: ReactNode }) {
  return (
    <span className="relative isolate inline-block">
      <span
        className={`relative block border-y-3 border-(--accent) bg-[linear-gradient(180deg,color-mix(in_srgb,var(--plate)_85%,white),var(--plate)_60%)] px-[48px] pt-[6px] pb-[10px] font-serif text-[38px] leading-[1.2] whitespace-nowrap text-[#ffe27a] shadow-[0_5px_0_rgba(0,0,0,0.25)] ${tail}`}
      >
        {children}
      </span>
    </span>
  );
}
