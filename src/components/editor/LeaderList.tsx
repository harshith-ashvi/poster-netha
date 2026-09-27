import type { ActionDispatch } from "react";
import { Plus, X } from "lucide-react";
import { MAX_LEADERS, newPerson } from "@/lib/presets";
import { setField, type Action } from "@/lib/reducer";
import type { PosterData } from "@/lib/types";
import { ImageSlot } from "./ImageSlot";
import { btnCls, Field, inputCls } from "./ui";

export function LeaderList({ data, dispatch }: { data: PosterData; dispatch: ActionDispatch<[Action]> }) {
  const { leaders } = data;
  return (
    <>
      <Field label="Blessings label">
        <input className={inputCls} value={data.blessingsLabel} onChange={(e) => dispatch(setField("blessingsLabel", e.target.value))} />
      </Field>
      <ol className="flex flex-col gap-3">
        {leaders.map((p, i) => (
          <li key={p.id} className="flex flex-col gap-3 rounded-lg border border-[#ecdcb4] bg-white/60 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#7a6440]">Leader {i + 1}</span>
              <button
                type="button"
                className={`${btnCls} px-2 py-1`}
                onClick={() => dispatch({ type: "removeLeader", id: p.id })}
                aria-label={`Remove leader ${i + 1}`}
              >
                <X size={16} aria-hidden />
              </button>
            </div>
            <ImageSlot
              label={`Leader ${i + 1}`}
              value={p}
              onChange={(patch) => dispatch({ type: "updateLeader", id: p.id, patch })}
            />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name">
                <input
                  className={inputCls}
                  value={p.name}
                  onChange={(e) => dispatch({ type: "updateLeader", id: p.id, patch: { name: e.target.value } })}
                />
              </Field>
              <Field label="Role">
                <input
                  className={inputCls}
                  value={p.role}
                  onChange={(e) => dispatch({ type: "updateLeader", id: p.id, patch: { role: e.target.value } })}
                />
              </Field>
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className={btnCls}
        disabled={leaders.length >= MAX_LEADERS}
        onClick={() => dispatch({ type: "addLeader", person: newPerson() })}
      >
        <Plus size={16} aria-hidden />
        {leaders.length >= MAX_LEADERS ? `That's ${MAX_LEADERS}, the stage is full` : "Add leader"}
      </button>
    </>
  );
}
