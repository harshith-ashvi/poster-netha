import { HardHat } from "lucide-react";
import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { BeforeAfter } from "../parts/BeforeAfter";
import { Footer } from "../parts/Footer";
import { GoldFrame } from "../parts/GoldFrame";
import { HeroMedallion } from "../parts/HeroMedallion";
import { LeaderRow } from "../parts/LeaderRow";

const TAPE = "relative z-2 h-[34px] flex-none border-y-3 border-[#161616] bg-[repeating-linear-gradient(-45deg,#ffcc00_0_34px,#161616_34px_68px)]";
const POST = "absolute top-[40px] h-[460px] w-[22px] bg-[linear-gradient(90deg,#6d6d6d,#c9c9c9_50%,#6d6d6d)]";

const BG = "linear-gradient(180deg, var(--bg-from), var(--bg-to) 46%, #2a2a2a 46%)";

export function Infrastructure({ data }: { data: PosterData }) {
  const n = data.leaders.length;
  const sign = data.bigNumber || data.achievement;
  return (
    <GoldFrame background={BG}>
      {/* Road in perspective from the horizon down to the bottom edge */}
      <div className="absolute inset-x-0 top-[46%] bottom-0 bg-[linear-gradient(180deg,#3b3b3b,#1c1c1c)] [clip-path:polygon(42%_0,58%_0,100%_100%,0_100%)]" />
      <div className="absolute top-[46%] bottom-0 left-1/2 w-[60px] -translate-x-1/2 bg-[repeating-linear-gradient(180deg,#fff_0_60px,transparent_60px_120px)] [clip-path:polygon(46%_0,54%_0,80%_100%,20%_100%)]" />
      <div className="absolute inset-0 flex flex-col">
        <div className={TAPE} />
        <LeaderRow className="pt-[18px]" leaders={data.leaders} label={data.blessingsLabel} size={n > 4 ? 88 : 100} />

        <div className="relative mx-[50px] mt-[14px] text-center">
          <div className="gold-text" style={{ fontSize: fitFont(data.headline, 96, 56, 20) }}>
            {data.headline}
          </div>
        </div>

        {/* Green highway sign on two posts */}
        {sign && (
          <div className="relative mt-[18px] flex justify-center">
            <div className={`${POST} left-[250px]`} />
            <div className={`${POST} right-[250px]`} />
            <div className="relative w-[860px] rounded-[22px] border-6 border-[#0b6b3a] bg-[#0b6b3a] px-[36px] pt-[18px] pb-[22px] text-center text-white outline-5 outline-offset-[-16px] outline-white">
              <div className="line-clamp-2 font-display leading-[1.05] uppercase wrap-anywhere" style={{ fontSize: fitFont(sign, 140, 54, 8) }}>
                {sign}
              </div>
              {data.bigNumber && data.achievement && (
                <div className="mt-[4px] line-clamp-2 font-sans leading-[1.2] font-bold wrap-anywhere" style={{ fontSize: fitFont(data.achievement, 34, 22, 44) }}>
                  {data.achievement}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="relative mx-[70px] mt-[22px] h-[210px] flex-none">
          <BeforeAfter data={data} textSize={fitFont(`${data.beforeLabel}${data.afterLabel}`, 60, 34, 14)} />
        </div>

        <div className="relative flex min-h-0 flex-1 items-end gap-[24px] px-[40px] pb-[16px]">
          {/* pt leaves room for the hard hat */}
          <div className="flex h-full flex-none items-end pt-[64px]">
            <HeroMedallion person={data.hero} max={270}>
              <HardHat className="absolute -top-[36%] left-1/2 z-2 -translate-x-1/2 -rotate-8" size="74%" strokeWidth={1.4} color="#3b2a00" fill="#ffc400" aria-hidden />
            </HeroMedallion>
          </div>
          {data.heroTagline && <div className="mb-[20px] line-clamp-3 min-w-0 flex-1 rounded-[10px] border-5 border-[#161616] bg-[#ff8a00] px-[22px] py-[14px] font-serif text-[32px] leading-[1.15] text-[#161616]">{data.heroTagline}</div>}
        </div>

        <div className={TAPE} />
        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
