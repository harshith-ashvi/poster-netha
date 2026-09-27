import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { BeforeAfter } from "../parts/BeforeAfter";
import { Footer } from "../parts/Footer";
import { GoldFrame } from "../parts/GoldFrame";
import { LeaderBadge } from "../parts/LeaderBadge";

const BG = "linear-gradient(160deg, var(--bg-from), var(--bg-to))";

export function Development({ data }: { data: PosterData }) {
  const { leaders } = data;
  const badge = leaders.length > 4 ? 76 : 92;
  return (
    <GoldFrame background={BG}>
      {/* Blueprint grid: "development" in the planning-department sense */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.09)_0_2px,transparent_2px_54px),repeating-linear-gradient(90deg,rgba(255,255,255,0.09)_0_2px,transparent_2px_54px)]" />
      <div className="absolute inset-0 flex flex-col">
        {leaders.length > 0 && (
          <div className="relative flex items-center justify-center gap-[18px] border-b-5 border-(--accent) bg-[linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.2))] px-[40px] pt-[26px] pb-[18px]">
            {data.blessingsLabel && <div className="max-w-[190px] flex-none text-right font-serif text-[30px] leading-[1.1] text-[#ffe27a]">{data.blessingsLabel}</div>}
            <div className="flex gap-[8px]">
              {leaders.map((p) => (
                <LeaderBadge key={p.id} person={p} size={badge} />
              ))}
            </div>
          </div>
        )}

        <div className="relative mx-[50px] mt-[26px] text-center">
          <div className="gold-text" style={{ fontSize: fitFont(data.headline, 104, 58, 20) }}>
            {data.headline}
          </div>
          <div className="mx-auto mt-[14px] h-[12px] w-[60%] rounded-[6px] bg-[linear-gradient(90deg,transparent,var(--accent)_15%,#fff6c4_50%,var(--accent)_85%,transparent)]" />
        </div>

        <div className="relative mx-[44px] mt-[24px] min-h-0 flex-1">
          <BeforeAfter data={data} textSize={fitFont(`${data.beforeLabel}${data.afterLabel}`, 80, 40, 16)} />
        </div>

        <div className="relative flex h-[330px] flex-none items-end gap-[24px] px-[40px] pb-[20px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[14px] self-center">
            {data.achievement && (
              <div className="rounded-[10px] border-6 border-(--accent) bg-[#fffaf0] px-[26px] py-[18px] outline-4 outline-(--plate)">
                <div className="line-clamp-3 font-sans leading-[1.15] font-extrabold text-[#4a0000] wrap-anywhere" style={{ fontSize: fitFont(data.achievement, 40, 24, 44) }}>
                  {data.achievement}
                </div>
              </div>
            )}
            {data.heroTagline && <div className="line-clamp-2 font-serif text-[32px] leading-[1.15] text-(--text)">{data.heroTagline}</div>}
          </div>
          <LeaderBadge person={data.hero} size={230} />
        </div>

        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
