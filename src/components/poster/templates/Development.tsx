import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { BeforeAfter } from "../parts/BeforeAfter";
import { Footer } from "../parts/Footer";
import { GoldFrame } from "../parts/GoldFrame";
import { LeaderBadge } from "../parts/LeaderBadge";
import ps from "../parts/parts.module.css";
import s from "./Development.module.css";

const BG = "linear-gradient(160deg, var(--bg-from), var(--bg-to))";

export function Development({ data }: { data: PosterData }) {
  const { leaders } = data;
  const badge = leaders.length > 4 ? 76 : 92;
  return (
    <GoldFrame background={BG}>
      <div className={s.grid} />
      <div className={s.root}>
        {leaders.length > 0 && (
          <div className={s.strip}>
            {data.blessingsLabel && <div className={s.stripLabel}>{data.blessingsLabel}</div>}
            <div className={s.stripBadges}>
              {leaders.map((p) => (
                <LeaderBadge key={p.id} person={p} size={badge} />
              ))}
            </div>
          </div>
        )}

        <div className={s.head}>
          <div className={ps.goldText} style={{ fontSize: fitFont(data.headline, 104, 58, 20) }}>
            {data.headline}
          </div>
          <div className={s.underline} />
        </div>

        <div className={s.ba}>
          <BeforeAfter data={data} textSize={fitFont(`${data.beforeLabel}${data.afterLabel}`, 80, 40, 16)} />
        </div>

        <div className={s.bottom}>
          <div className={s.words}>
            {data.achievement && (
              <div className={s.caption}>
                <div className={s.captionText} style={{ fontSize: fitFont(data.achievement, 40, 24, 44) }}>
                  {data.achievement}
                </div>
              </div>
            )}
            {data.heroTagline && <div className={s.tagline}>{data.heroTagline}</div>}
          </div>
          <LeaderBadge person={data.hero} size={230} />
        </div>

        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
