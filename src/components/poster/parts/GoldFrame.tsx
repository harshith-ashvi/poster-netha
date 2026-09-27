import type { CSSProperties, ReactNode } from "react";
import s from "./parts.module.css";

export function GoldFrame({ background, children }: { background: CSSProperties["background"]; children: ReactNode }) {
  return (
    <div className={s.frame}>
      <div className={s.frameInner} style={{ background }}>
        {children}
        <div className={s.frameLine} />
      </div>
    </div>
  );
}
