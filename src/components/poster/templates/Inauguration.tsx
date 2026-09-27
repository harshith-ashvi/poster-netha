import { Scissors } from "lucide-react";
import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { Footer } from "../parts/Footer";
import { Garland } from "../parts/Garland";
import { GoldFrame } from "../parts/GoldFrame";
import { HeroMedallion } from "../parts/HeroMedallion";
import { LeaderRow } from "../parts/LeaderRow";

const BG =
  "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.45), transparent 50%), linear-gradient(180deg, var(--bg-from), var(--bg-to))";

const bowLoop =
  "absolute top-[8px] h-[108px] w-[110px] border-4 border-[#ffd23f] bg-[radial-gradient(ellipse_at_50%_40%,#ff6a6a,#c8102e_55%,#8a0015)]";

export function Inauguration({ data }: { data: PosterData }) {
  const n = data.leaders.length;
  return (
    <GoldFrame background={BG}>
      <Garland className="absolute -top-[6px] left-[16px] z-3 h-[62%]" />
      <Garland className="absolute -top-[6px] right-[16px] z-3 h-[62%]" />
      <div className="absolute inset-0 flex flex-col">
        <div className="relative px-[90px] pt-[36px] text-center">
          <div className="gold-text" style={{ fontSize: fitFont(data.headline, 104, 58, 20) }}>
            {data.headline}
          </div>
        </div>

        <LeaderRow className="mt-[22px]" leaders={data.leaders} label={data.blessingsLabel} size={n > 3 ? 104 : 130} perRow={n <= 4 ? 4 : 3} />

        {/* Satin ribbon across the poster, about to be cut */}
        <div className="relative mt-[18px] h-[150px] flex-none">
          <div className="absolute inset-x-0 top-[50px] h-[52px] border-y-3 border-[#ffd23f] bg-[linear-gradient(180deg,#ff6a6a_0%,#d0102e_35%,#9a0020_70%,#c8102e_100%)]" />
          <div className="absolute top-[14px] left-1/2 h-[124px] w-[240px] -translate-x-1/2">
            <div className={`${bowLoop} left-0 rounded-[60%_20%_20%_60%/50%]`} />
            <div className={`${bowLoop} right-0 rounded-[20%_60%_60%_20%/50%]`} />
            <div className="absolute top-[36px] left-1/2 size-[52px] -translate-x-1/2 rounded-full border-4 border-[#ffd23f] bg-[radial-gradient(circle_at_40%_35%,#ff8a8a,#b0001e)]" />
          </div>
          <Scissors className="absolute top-[12px] right-[150px] -rotate-20" size={120} strokeWidth={2.2} color="#3b0a00" fill="#e8e8e8" aria-hidden />
        </div>

        {(data.achievement || data.heroTagline) && (
          <div className="relative z-2 mx-[110px] rounded-[10px] border-8 border-double border-(--accent) bg-[linear-gradient(180deg,#fffdf5,#f1dfae)] px-[32px] pt-[14px] pb-[20px] text-center outline-4 outline-(--plate)">
            <div className="font-condensed text-[34px] leading-none text-(--plate)">Inaugurated today</div>
            {data.achievement && (
              <div
                className="line-clamp-3 font-sans leading-[1.15] font-extrabold text-[#4a0000] wrap-anywhere"
                style={{ fontSize: fitFont(data.achievement, 44, 26, 36) }}
              >
                {data.achievement}
              </div>
            )}
            {data.heroTagline && (
              <div className="mt-[8px] line-clamp-2 font-serif text-[28px] leading-[1.15] text-[#6b3a00]">{data.heroTagline}</div>
            )}
          </div>
        )}

        {/* Red carpet in perspective, hero standing at the end of it */}
        <div className="relative flex min-h-0 flex-1 items-end justify-center pb-[18px]">
          <div className="absolute inset-x-0 -top-[30px] bottom-0 bg-[#ffd23f] [clip-path:polygon(35%_0,65%_0,104%_100%,-4%_100%)]" />
          <div className="absolute inset-x-0 -top-[30px] bottom-0 bg-[linear-gradient(180deg,#7a0014,#c8102e_60%,#e0213e)] [clip-path:polygon(36.5%_0,63.5%_0,101%_100%,-1%_100%)]" />
          <HeroMedallion person={data.hero} max={330} />
        </div>

        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
