import type { CSSProperties, ReactNode } from "react";

export function GoldFrame({ background, children }: { background: CSSProperties["background"]; children: ReactNode }) {
  return (
    <div className="absolute inset-0 bg-gold-sheen p-[18px]">
      <div className="relative size-full overflow-hidden shadow-[inset_0_0_0_3px_#5a2a00]" style={{ background }}>
        {children}
        <div className="pointer-events-none absolute inset-[10px] z-50 border-3 border-(--accent)" />
      </div>
    </div>
  );
}
