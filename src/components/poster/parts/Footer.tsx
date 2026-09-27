import { COPY } from "@/lib/presets";
import type { PosterData } from "@/lib/types";
import { Watermark } from "./Watermark";

function Ticker({ data }: { data: PosterData }) {
  const text = [data.headline, data.achievement, data.hero.name && `${data.hero.name} ZINDABAD`].filter(Boolean).join("  ★  ");
  return (
    <div className="relative z-2 flex h-[64px] items-stretch overflow-hidden border-t-5 border-(--plate) bg-[#fff6d6]">
      <span className="flex flex-none items-center bg-(--plate) px-[22px] pt-[4px] font-condensed text-[40px] text-[#ffe27a] uppercase">
        {COPY[data.lang].breaking}
      </span>
      <div className="flex min-w-0 flex-1 items-center overflow-hidden">
        {/* Four identical copies so translateX(-50%) loops seamlessly */}
        <div className="flex flex-none animate-ticker font-display text-[40px] whitespace-nowrap text-[#3b0a00] uppercase motion-reduce:animate-none [&>span]:pr-[40px]">
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
      <div className="relative z-2 flex items-center justify-between gap-[24px] border-t-6 border-(--accent) bg-[linear-gradient(180deg,#2a0800,#140300)] px-[40px] pt-[16px] pb-[18px]">
        <span className="min-w-0 truncate font-condensed text-[36px] leading-none text-(--accent)">{data.footerText}</span>
        {data.showWatermark && <Watermark />}
      </div>
    </>
  );
}
