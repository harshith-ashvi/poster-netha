import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { GoldFrame } from "../parts/GoldFrame";
import { Footer } from "../parts/Footer";
import { Photo } from "../parts/Photo";
import { LeaderRow } from "../parts/LeaderRow";
import ps from "../parts/parts.module.css";
import s from "./Blessings.module.css";

const BG =
  "radial-gradient(ellipse at 50% 18%, rgba(255,255,255,0.35), transparent 55%), linear-gradient(170deg, var(--bg-from), var(--bg-to))";

// Fewer leaders get bigger medallions; 6 still fit across 1044px.
const leaderSize = (n: number) => Math.min(180, Math.floor(900 / n) - 30);

export function Blessings({ data }: { data: PosterData }) {
  const { leaders, hero } = data;
  return (
    <GoldFrame background={BG}>
      <div className={s.rays} />
      <div className={s.root}>
        <LeaderRow className={s.top} leaders={leaders} label={data.blessingsLabel} size={leaderSize(leaders.length)} />

        <div className={s.band} style={leaders.length === 0 ? { marginTop: 70 } : undefined}>
          <div className={ps.goldText} style={{ fontSize: fitFont(data.headline, 108, 60, 24) }}>
            {data.headline}
          </div>
        </div>

        <div className={s.bottom}>
          <div className={s.hero}>
            <div className={s.heroArch}>
              <div className={s.heroPhoto}>
                <Photo person={hero} />
              </div>
            </div>
            {(hero.name || hero.role) && (
              <div className={s.heroPlate}>
                {hero.name && <div className={s.heroName}>{hero.name}</div>}
                {hero.role && <div className={s.heroRole}>{hero.role}</div>}
              </div>
            )}
          </div>

          <div className={s.right}>
            {data.achievement && (
              <div className={s.placard}>
                <div className={s.burst}>
                  WELL
                  <br />
                  DONE!
                </div>
                <div className={s.placardText} style={{ fontSize: fitFont(data.achievement, 48, 28, 40) }}>
                  {data.achievement}
                </div>
              </div>
            )}
            {data.heroTagline && <div className={s.tagline}>{data.heroTagline}</div>}
          </div>
        </div>

        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
