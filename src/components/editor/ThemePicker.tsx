import type { ActionDispatch } from "react";
import { THEMES } from "@/lib/presets";
import { setField, type Action } from "@/lib/reducer";

export function ThemePicker({ themeId, dispatch }: { themeId: string; dispatch: ActionDispatch<[Action]> }) {
  return (
    <fieldset className="flex flex-wrap gap-3">
      <legend className="sr-only">Colour theme</legend>
      {THEMES.map((t) => (
        <label key={t.id} className="flex cursor-pointer flex-col items-center gap-1 text-xs font-semibold text-[#3d2a14]">
          <input
            type="radio"
            name="theme"
            className="peer sr-only"
            checked={themeId === t.id}
            onChange={() => dispatch(setField("themeId", t.id))}
          />
          <span
            aria-hidden
            className="size-12 rounded-full border-4 border-white shadow-[0_0_0_2px_#e3cf9f] peer-checked:shadow-[0_0_0_3px_#b3001b] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#b3001b]"
            style={{ background: `linear-gradient(135deg, ${t.vars["--bg-from"]} 50%, ${t.vars["--plate"]} 50%)` }}
          />
          {t.name}
        </label>
      ))}
    </fieldset>
  );
}
