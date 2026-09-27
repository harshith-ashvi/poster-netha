import type { ActionDispatch } from "react";
import { Dices } from "lucide-react";
import { COPY, copyForLang, randomCopy } from "@/lib/presets";
import type { Action } from "@/lib/reducer";
import type { Lang, PosterData } from "@/lib/types";
import { btnCls, inputCls } from "./ui";

// Language picker + "Randomize copy". Both write real strings into PosterData, so everything stays editable.
export function CopyTools({ data, dispatch }: { data: PosterData; dispatch: ActionDispatch<[Action]> }) {
  return (
    <div className="flex items-end gap-2">
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-sm font-semibold text-[#3d2a14]">Poster language</span>
        <select
          className={inputCls}
          value={data.lang}
          onChange={(e) => dispatch({ type: "merge", patch: copyForLang(data, e.target.value as Lang) })}
        >
          {(Object.keys(COPY) as Lang[]).map((l) => (
            <option key={l} value={l}>
              {COPY[l].name}
            </option>
          ))}
        </select>
      </label>
      <button type="button" className={`${btnCls} py-2.5`} onClick={() => dispatch({ type: "merge", patch: randomCopy(data.lang) })}>
        <Dices size={16} aria-hidden />
        Randomize copy
      </button>
    </div>
  );
}
