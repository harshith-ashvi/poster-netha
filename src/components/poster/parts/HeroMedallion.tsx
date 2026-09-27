import type { ReactNode } from "react";
import type { Person } from "@/lib/types";
import { Photo } from "./Photo";
import s from "./parts.module.css";

// Circle portrait that sizes itself to the parent's height (capped at `max`), so it never overlaps
// content above it. Parent must have a definite height (e.g. a flex:1 column item).
export function HeroMedallion({ person, max, children }: { person: Person; max: number; children?: ReactNode }) {
  return (
    <div className={s.medal} style={{ maxHeight: max }}>
      {children}
      <div className={s.badgeRing}>
        <div className={s.badgePhoto}>
          <Photo person={person} />
        </div>
      </div>
      {(person.name || person.role) && (
        <div className={`${s.badgePlate} ${s.medalPlate}`}>
          {person.name && (
            <div className={s.badgeName} style={{ fontSize: 44 }}>
              {person.name}
            </div>
          )}
          {person.role && (
            <div className={s.badgeRole} style={{ fontSize: 30 }}>
              {person.role}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
