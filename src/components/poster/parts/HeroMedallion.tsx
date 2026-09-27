import type { ReactNode } from "react";
import type { Person } from "@/lib/types";
import { nameCls, photoCls, plateCls, ringCls, roleCls } from "./LeaderBadge";
import { Photo } from "./Photo";

// Circle portrait that sizes itself to the parent's height (capped at `max`), so it never overlaps
// content above it. Parent must have a definite height (e.g. a flex:1 column item).
export function HeroMedallion({ person, max, children }: { person: Person; max: number; children?: ReactNode }) {
  return (
    <div className="relative aspect-square h-full flex-none" style={{ maxHeight: max }}>
      {children}
      <div className={`${ringCls} size-full`}>
        <div className={photoCls}>
          <Photo person={person} />
        </div>
      </div>
      {(person.name || person.role) && (
        <div className={`${plateCls} absolute -bottom-[6px] left-1/2 max-w-[125%] -translate-x-1/2`}>
          {person.name && (
            <div className={nameCls} style={{ fontSize: 44 }}>
              {person.name}
            </div>
          )}
          {person.role && (
            <div className={roleCls} style={{ fontSize: 30 }}>
              {person.role}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
