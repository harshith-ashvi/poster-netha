import { COPY } from "@/lib/presets";
import type { PosterData } from "@/lib/types";
import { Watermark } from "./Watermark";
import s from "./parts.module.css";

function Ticker({ data }: { data: PosterData }) {
  const text = [data.headline, data.achievement, data.hero.name && `${data.hero.name} ZINDABAD`].filter(Boolean).join("  ★  ");
  return (
    <div className={s.ticker}>
      <span className={s.tickerTag}>{COPY[data.lang].breaking}</span>
      <div className={s.tickerTrack}>
        {/* Two identical halves so translateX(-50%) loops seamlessly */}
        <div className={s.tickerMove}>
          <span>★ {text}</span>
          <span>★ {text}</span>
          <span>★ {text}</span>
          <span>★ {text}</span>
        </div>
      </div>
    </div>
  );
}

export function Footer({ data }: { data: PosterData }) {
  return (
    <>
      {data.stickers.ticker && <Ticker data={data} />}
      <div className={s.footer}>
        <span className={s.footerText}>{data.footerText}</span>
        {data.showWatermark && <Watermark />}
      </div>
    </>
  );
}
