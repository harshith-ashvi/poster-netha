import type { Person } from "@/lib/types";
import { Photo } from "./Photo";

// Shared with HeroMedallion. Position/margin/max-width are left to each caller.
export const ringCls = "rounded-full p-[7px] bg-gold-conic shadow-[0_8px_0_rgba(0,0,0,0.22),0_0_0_4px_var(--plate)]";
export const photoCls = "size-full overflow-hidden rounded-full";
export const plateCls =
  "rounded-[10px] border-3 border-(--accent) bg-(--plate) px-[18px] pt-[4px] pb-[2px] text-center shadow-[0_4px_0_rgba(0,0,0,0.25)]";
export const nameCls = "truncate font-display leading-[1.05] text-[#ffe27a] uppercase";
export const roleCls = "truncate font-condensed leading-none text-white";

export function LeaderBadge({ person, size }: { person: Person; size: number }) {
  return (
    <div className="flex flex-col items-center" style={{ width: size + 30 }}>
      <div className={ringCls} style={{ width: size, height: size }}>
        <div className={photoCls}>
          <Photo person={person} />
        </div>
      </div>
      {(person.name || person.role) && (
        <div className={`${plateCls} relative -mt-[18px] max-w-full`}>
          {person.name && (
            <div className={nameCls} style={{ fontSize: Math.round(size * 0.2) }}>
              {person.name}
            </div>
          )}
          {person.role && (
            <div className={roleCls} style={{ fontSize: Math.round(size * 0.17) }}>
              {person.role}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
