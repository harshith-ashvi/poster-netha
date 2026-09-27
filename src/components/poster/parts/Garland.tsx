import type { CSSProperties } from "react";
import s from "./parts.module.css";

export function Garland({ style }: { style?: CSSProperties }) {
  return <div className={s.garland} style={style} aria-hidden />;
}
