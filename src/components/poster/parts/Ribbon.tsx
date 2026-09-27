import type { ReactNode } from "react";
import s from "./parts.module.css";

export function Ribbon({ children }: { children: ReactNode }) {
  return (
    <span className={s.ribbonWrap}>
      <span className={s.ribbon}>{children}</span>
    </span>
  );
}
