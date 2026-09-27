import { Trophy } from "lucide-react";
import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { Footer } from "../parts/Footer";
import { GoldFrame } from "../parts/GoldFrame";
import { Laurel } from "../parts/Laurel";
import { LeaderBadge } from "../parts/LeaderBadge";
import { LeaderRow } from "../parts/LeaderRow";
import ps from "../parts/parts.module.css";
import s from "./Achievement.module.css";

const BG = "radial-gradient(circle at 50% 52%, var(--bg-to), var(--bg-from) 75%)";

export function Achievement({ data }: { data: PosterData }) {
  const n = data.leaders.length;
  // No big number? The achievement itself becomes the giant text.
  const big = data.bigNumber || data.achievement;
  const showBanner = !!data.bigNumber && !!data.achievement;
  return (
    <GoldFrame background={BG}>
      <div className={s.burst} />
      <div className={s.root}>
        <LeaderRow className={s.top} leaders={data.leaders} label={data.blessingsLabel} size={n > 4 ? 100 : 124} />

        <div className={s.head}>
          <div className={ps.goldText} style={{ fontSize: fitFont(data.headline, 88, 52, 22) }}>
            {data.headline}
          </div>
        </div>

        <div className={s.center}>
          <Trophy size={n > 0 ? 110 : 150} strokeWidth={1.6} color="#7a4a00" fill="#ffd23f" aria-hidden />
          {big && (
            <div className={s.numberRow}>
              <Laurel height={200} />
              <div className={`${ps.goldText} ${s.number}`} style={{ fontSize: fitFont(big, 190, 64, 7) }}>
                {big}
              </div>
              <Laurel height={200} flip />
            </div>
          )}
          {showBanner && (
            <div className={s.banner}>
              <div className={s.bannerText} style={{ fontSize: fitFont(data.achievement, 40, 24, 40) }}>
                {data.achievement}
              </div>
            </div>
          )}
        </div>

        <div className={s.bottom}>
          <LeaderBadge person={data.hero} size={n > 0 ? 220 : 260} />
          {data.heroTagline && <div className={s.tagline}>{data.heroTagline}</div>}
        </div>

        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
