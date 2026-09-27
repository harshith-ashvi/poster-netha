import { Scissors } from "lucide-react";
import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { Footer } from "../parts/Footer";
import { Garland } from "../parts/Garland";
import { GoldFrame } from "../parts/GoldFrame";
import { HeroMedallion } from "../parts/HeroMedallion";
import { LeaderRow } from "../parts/LeaderRow";
import ps from "../parts/parts.module.css";
import s from "./Inauguration.module.css";

const BG =
  "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.45), transparent 50%), linear-gradient(180deg, var(--bg-from), var(--bg-to))";

export function Inauguration({ data }: { data: PosterData }) {
  const n = data.leaders.length;
  return (
    <GoldFrame background={BG}>
      <Garland style={{ position: "absolute", top: -6, left: 16, zIndex: 3, height: "62%" }} />
      <Garland style={{ position: "absolute", top: -6, right: 16, zIndex: 3, height: "62%" }} />
      <div className={s.root}>
        <div className={s.head}>
          <div className={ps.goldText} style={{ fontSize: fitFont(data.headline, 104, 58, 20) }}>
            {data.headline}
          </div>
        </div>

        <LeaderRow className={s.leaders} leaders={data.leaders} label={data.blessingsLabel} size={n > 3 ? 104 : 130} perRow={n <= 4 ? 4 : 3} />

        <div className={s.ceremony}>
          <div className={s.satin} />
          <div className={s.bow}>
            <div className={s.bowLoop} />
            <div className={s.bowLoop} />
            <div className={s.bowKnot} />
          </div>
          <Scissors className={s.scissors} size={120} strokeWidth={2.2} color="#3b0a00" fill="#e8e8e8" aria-hidden />
        </div>

        {(data.achievement || data.heroTagline) && (
          <div className={s.plaque}>
            <div className={s.plaqueLabel}>Inaugurated today</div>
            {data.achievement && (
              <div className={s.plaqueText} style={{ fontSize: fitFont(data.achievement, 44, 26, 36) }}>
                {data.achievement}
              </div>
            )}
            {data.heroTagline && <div className={s.tagline}>{data.heroTagline}</div>}
          </div>
        )}

        <div className={s.carpetArea}>
          <div className={s.carpetEdge} />
          <div className={s.carpet} />
          <HeroMedallion person={data.hero} max={330} />
        </div>

        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
