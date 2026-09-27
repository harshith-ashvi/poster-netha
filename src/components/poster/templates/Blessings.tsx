import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { GoldFrame } from "../parts/GoldFrame";
import { Footer } from "../parts/Footer";
import { Photo } from "../parts/Photo";
import { LeaderRow } from "../parts/LeaderRow";

const BG =
  "radial-gradient(ellipse at 50% 18%, rgba(255,255,255,0.35), transparent 55%), linear-gradient(170deg, var(--bg-from), var(--bg-to))";

// Fewer leaders get bigger medallions; 6 still fit across 1044px.
const leaderSize = (n: number) => Math.min(180, Math.floor(900 / n) - 30);

export function Blessings({ data }: { data: PosterData }) {
  const { leaders, hero } = data;
  return (
    <GoldFrame background={BG}>
      {/* Sunburst radiating from behind the hero */}
      <div className="absolute top-[300px] -left-[420px] size-[1400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0_12%,transparent_45%),repeating-conic-gradient(rgba(255,255,255,0.16)_0_6deg,transparent_6deg_12deg)]" />
      <div className="absolute inset-0 flex flex-col">
        <LeaderRow className="pt-[34px]" leaders={leaders} label={data.blessingsLabel} size={leaderSize(leaders.length)} />

        <div
          className="relative z-2 mx-[-40px] mt-[26px] -rotate-[2.2deg] border-y-10 border-(--accent) bg-[linear-gradient(180deg,color-mix(in_srgb,var(--plate)_80%,white)_0%,var(--plate)_35%,color-mix(in_srgb,var(--plate)_70%,black)_100%)] px-[50px] pt-[16px] pb-[24px] text-center shadow-[0_18px_0_rgba(0,0,0,0.18)]"
          style={leaders.length === 0 ? { marginTop: 70 } : undefined}
        >
          <div className="gold-text" style={{ fontSize: fitFont(data.headline, 108, 60, 24) }}>
            {data.headline}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 gap-[28px] px-[40px] pt-[34px] pb-[26px]">
          <div className="relative flex w-[470px] flex-none flex-col">
            <div className="min-h-0 flex-1 rounded-t-[235px] rounded-b-[28px] bg-[linear-gradient(135deg,#7a4a00,#ffe27a_25%,#b8860b_50%,#fff6c4_70%,#a86f00)] p-[10px] shadow-[0_0_0_6px_var(--plate),0_18px_30px_rgba(0,0,0,0.35)]">
              <div className="size-full overflow-hidden rounded-t-[225px] rounded-b-[20px]">
                <Photo person={hero} />
              </div>
            </div>
            {(hero.name || hero.role) && (
              <div className="relative mx-[18px] -mt-[64px] rounded-[14px] border-5 border-(--accent) bg-(--plate) px-[20px] pt-[8px] pb-[10px] text-center shadow-[0_8px_0_rgba(0,0,0,0.25)]">
                {hero.name && (
                  <div className="truncate font-display text-[60px] leading-[1.05] text-[#ffe27a] uppercase text-shadow-[0_3px_0_#4a2400]">
                    {hero.name}
                  </div>
                )}
                {hero.role && <div className="font-condensed text-[36px] leading-none text-white">{hero.role}</div>}
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-[30px]">
            {data.achievement && (
              <div className="relative rotate-[1.5deg] rounded-[8px] border-8 border-(--accent) bg-[#fffaf0] px-[30px] pt-[44px] pb-[30px] shadow-[0_16px_0_rgba(0,0,0,0.2)] outline-4 outline-(--plate)">
                {/* Starburst sticker pinned to the placard corner */}
                <div className="absolute -top-[104px] -right-[34px] grid size-[136px] rotate-12 place-items-center bg-(--plate) text-center font-display text-[30px] leading-[0.95] text-[#ffe27a] clip-starburst">
                  WELL
                  <br />
                  DONE!
                </div>
                <div
                  className="line-clamp-6 font-sans leading-[1.15] font-extrabold text-[#5a0000] wrap-anywhere"
                  style={{ fontSize: fitFont(data.achievement, 48, 28, 40) }}
                >
                  {data.achievement}
                </div>
              </div>
            )}
            {data.heroTagline && (
              <div className="line-clamp-3 text-center font-serif text-[34px] leading-[1.15] text-(--text) text-shadow-[0_2px_0_rgba(255,255,255,0.35)]">
                {data.heroTagline}
              </div>
            )}
          </div>
        </div>

        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
