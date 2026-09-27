import type { ActionDispatch } from "react";
import type { Action } from "@/lib/reducer";
import type { Stickers } from "@/lib/types";

const OPTIONS: { key: keyof Stickers; label: string }[] = [
  { key: "garlands", label: "Marigold garland across the top" },
  { key: "flowerShower", label: "Flower shower" },
  { key: "congratsStrip", label: "Congratulations sash" },
  { key: "ticker", label: "Breaking-news ticker" },
];

export function StickerToggles({ stickers, dispatch }: { stickers: Stickers; dispatch: ActionDispatch<[Action]> }) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="sr-only">Stickers</legend>
      {OPTIONS.map(({ key, label }) => (
        <label key={key} className="flex items-center gap-2 text-sm font-semibold text-[#3d2a14]">
          <input
            type="checkbox"
            className="size-4 accent-[#b3001b]"
            checked={stickers[key]}
            onChange={() => dispatch({ type: "toggleSticker", key })}
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
