import type { PosterData } from "@/lib/types";
import { Watermark } from "./Watermark";
import s from "./parts.module.css";

export function Footer({ data }: { data: PosterData }) {
  return (
    <div className={s.footer}>
      <span className={s.footerText}>{data.footerText}</span>
      {data.showWatermark && <Watermark />}
    </div>
  );
}
