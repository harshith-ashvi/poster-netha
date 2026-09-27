import { Trophy } from "lucide-react";
import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { Footer } from "../parts/Footer";
import { GoldFrame } from "../parts/GoldFrame";
import { Laurel } from "../parts/Laurel";
import { LeaderBadge } from "../parts/LeaderBadge";
import { LeaderRow } from "../parts/LeaderRow";

const BG = "radial-gradient(circle at 50% 52%, var(--bg-to), var(--bg-from) 75%)";

export function Achievement({ data }: { data: PosterData }) {
  const n = data.leaders.length;
  // No big number? The achievement itself becomes the giant text.
  const big = data.bigNumber || data.achievement;
  const showBanner = !!data.bigNumber && !!data.achievement;
  return (
    <GoldFrame background={BG}>
      {/* Giant starburst behind the big number */}
      <div className="absolute top-[52%] left-1/2 size-[1700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,246,196,0.85)_0_9%,rgba(255,210,63,0.35)_18%,transparent_40%),repeating-conic-gradient(rgba(255,255,255,0.18)_0_5deg,transparent_5deg_10deg)]" />
      <div className="absolute inset-0 flex flex-col">
        <LeaderRow className="pt-[32px]" leaders={data.leaders} label={data.blessingsLabel} size={n > 4 ? 100 : 124} />

        <div className="relative mx-[60px] mt-[18px] text-center">
          <div className="gold-text" style={{ fontSize: fitFont(data.headline, 88, 52, 22) }}>
            {data.headline}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-[10px] px-[50px]">
          <Trophy size={n > 0 ? 110 : 150} strokeWidth={1.6} color="#7a4a00" fill="#ffd23f" aria-hidden />
          {big && (
            <div className="flex max-w-full items-center gap-[10px]">
              <Laurel height={200} />
              {/* pb leaves room for the 3D extrusion under the clamp */}
              <div className="gold-text line-clamp-4 min-w-0 pb-[14px] text-center" style={{ fontSize: fitFont(big, 190, 64, 7) }}>
                {big}
              </div>
              <Laurel height={200} flip />
            </div>
          )}
          {showBanner && (
            <div className="relative max-w-[820px] border-y-5 border-(--accent) bg-[linear-gradient(180deg,color-mix(in_srgb,var(--plate)_85%,white),var(--plate)_55%,color-mix(in_srgb,var(--plate)_70%,black))] px-[40px] pt-[12px] pb-[16px] text-center">
              <div className="line-clamp-3 font-sans leading-[1.2] font-bold text-[#fff6d6] wrap-anywhere" style={{ fontSize: fitFont(data.achievement, 40, 24, 40) }}>
                {data.achievement}
              </div>
            </div>
          )}
        </div>

        <div className="relative flex items-end gap-[30px] px-[44px] pb-[22px]">
          <LeaderBadge person={data.hero} size={n > 0 ? 220 : 260} />
          {data.heroTagline && <div className="line-clamp-3 min-w-0 flex-1 pb-[30px] text-right font-serif text-[38px] leading-[1.15] text-(--text)">{data.heroTagline}</div>}
        </div>

        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
