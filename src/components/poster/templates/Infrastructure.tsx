import { HardHat } from "lucide-react";
import { fitFont } from "@/lib/fit";
import type { PosterData } from "@/lib/types";
import { BeforeAfter } from "../parts/BeforeAfter";
import { Footer } from "../parts/Footer";
import { GoldFrame } from "../parts/GoldFrame";
import { HeroMedallion } from "../parts/HeroMedallion";
import { LeaderRow } from "../parts/LeaderRow";
import ps from "../parts/parts.module.css";
import s from "./Infrastructure.module.css";

const BG = "linear-gradient(180deg, var(--bg-from), var(--bg-to) 46%, #2a2a2a 46%)";

export function Infrastructure({ data }: { data: PosterData }) {
  const n = data.leaders.length;
  const sign = data.bigNumber || data.achievement;
  return (
    <GoldFrame background={BG}>
      <div className={s.road} />
      <div className={s.laneLine} />
      <div className={s.root}>
        <div className={s.tape} />
        <LeaderRow className={s.top} leaders={data.leaders} label={data.blessingsLabel} size={n > 4 ? 88 : 100} />

        <div className={s.head}>
          <div className={ps.goldText} style={{ fontSize: fitFont(data.headline, 96, 56, 20) }}>
            {data.headline}
          </div>
        </div>

        {sign && (
          <div className={s.signWrap}>
            <div className={s.post} style={{ left: 250 }} />
            <div className={s.post} style={{ right: 250 }} />
            <div className={s.sign}>
              <div className={s.signNumber} style={{ fontSize: fitFont(sign, 140, 54, 8) }}>
                {sign}
              </div>
              {data.bigNumber && data.achievement && (
                <div className={s.signText} style={{ fontSize: fitFont(data.achievement, 34, 22, 44) }}>
                  {data.achievement}
                </div>
              )}
            </div>
          </div>
        )}

        <div className={s.ba}>
          <BeforeAfter data={data} textSize={fitFont(`${data.beforeLabel}${data.afterLabel}`, 60, 34, 14)} />
        </div>

        <div className={s.bottom}>
          <div className={s.hero}>
            <HeroMedallion person={data.hero} max={270}>
              <HardHat className={s.hat} size="74%" strokeWidth={1.4} color="#3b2a00" fill="#ffc400" aria-hidden />
            </HeroMedallion>
          </div>
          {data.heroTagline && <div className={s.tagline}>{data.heroTagline}</div>}
        </div>

        <div className={s.tape} />
        <Footer data={data} />
      </div>
    </GoldFrame>
  );
}
