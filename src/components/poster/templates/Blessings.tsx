import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { GoldFrame } from "../parts/GoldFrame";
import { LeaderBadge } from "../parts/LeaderBadge";
import { Photo } from "../parts/Photo";
import { Ribbon } from "../parts/Ribbon";
import { Watermark } from "../parts/Watermark";
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
        {leaders.length > 0 && (
          <div className={s.top}>
            <Ribbon>{data.blessingsLabel}</Ribbon>
            <div className={s.leaders}>
              {leaders.map((p) => (
                <LeaderBadge key={p.id} person={p} size={leaderSize(leaders.length)} />
              ))}
            </div>
          </div>
        )}

        <div className={s.band} style={leaders.length === 0 ? { marginTop: 70 } : undefined}>
          <div className={s.headline} style={{ fontSize: fitFont(data.headline, 108, 60, 24) }}>
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

        <div className={s.footer}>
          <span className={s.footerText}>{data.footerText}</span>
          {data.showWatermark && <Watermark />}
        </div>
      </div>
    </GoldFrame>
  );
}
