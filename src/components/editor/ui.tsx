import type { ReactNode } from "react";
import { Plus } from "lucide-react";

export const inputCls =
  "w-full rounded-md border border-[#e3cf9f] bg-white px-3 py-2 text-[15px] text-[#1a1a1a] outline-none focus-visible:border-[#b3001b] focus-visible:ring-2 focus-visible:ring-[#b3001b]/25";

export const btnCls =
  "inline-flex items-center justify-center gap-1.5 rounded-md border border-[#e3cf9f] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#fff1cc] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b3001b]";

// Native <details> = collapsible, keyboard accessible, zero JS.
export function Section({ title, open, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details open={open} className="group border-b border-[#ecdcb4] py-1">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-condensed text-[28px] leading-none text-[#7a0a0a] marker:hidden focus-visible:outline-2 focus-visible:outline-[#b3001b]">
        {title}
        <Plus size={22} aria-hidden className="transition-transform group-open:rotate-45" />
      </summary>
      <div className="flex flex-col gap-4 pb-5">{children}</div>
    </details>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-[#3d2a14]">{label}</span>
      {children}
      {hint && <span className="text-xs text-[#7a6440]">{hint}</span>}
    </label>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-xs font-semibold text-[#3d2a14]">
      <span className="w-20 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#b3001b]"
      />
    </label>
  );
}
