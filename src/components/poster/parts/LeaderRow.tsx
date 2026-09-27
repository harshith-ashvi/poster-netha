import type { Person } from "@/lib/types";
import { LeaderBadge } from "./LeaderBadge";
import { Ribbon } from "./Ribbon";

// Ribbon + leader badges. `perRow` caps badges per line (the rest wrap). Renders nothing with 0 leaders.
export function LeaderRow({ leaders, label, size, perRow = 6, className }: { leaders: Person[]; label: string; size: number; perRow?: number; className?: string }) {
  if (leaders.length === 0) return null;
  const badgeW = size + 30;
  return (
    <div className={`relative flex flex-col items-center gap-[20px] ${className ?? ""}`}>
      {label && <Ribbon>{label}</Ribbon>}
      <div className="flex flex-wrap items-start justify-center gap-x-[14px] gap-y-[12px] px-[30px]" style={{ maxWidth: perRow * badgeW + (perRow - 1) * 14 + 60 }}>
        {leaders.map((p) => (
          <LeaderBadge key={p.id} person={p} size={size} />
        ))}
      </div>
    </div>
  );
}
