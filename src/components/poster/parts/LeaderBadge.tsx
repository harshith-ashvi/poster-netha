import type { Person } from "@/lib/types";
import { Photo } from "./Photo";
import s from "./parts.module.css";

export function LeaderBadge({ person, size }: { person: Person; size: number }) {
  return (
    <div className={s.badge} style={{ width: size + 30 }}>
      <div className={s.badgeRing} style={{ width: size, height: size }}>
        <div className={s.badgePhoto}>
          <Photo person={person} />
        </div>
      </div>
      {(person.name || person.role) && (
        <div className={s.badgePlate}>
          {person.name && (
            <div className={s.badgeName} style={{ fontSize: Math.round(size * 0.2) }}>
              {person.name}
            </div>
          )}
          {person.role && (
            <div className={s.badgeRole} style={{ fontSize: Math.round(size * 0.17) }}>
              {person.role}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
