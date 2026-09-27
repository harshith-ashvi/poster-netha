import type { ActionDispatch } from "react";
import { setField, type Action } from "@/lib/reducer";
import type { PosterData } from "@/lib/types";
import { ImageSlot } from "./ImageSlot";
import { Field, inputCls } from "./ui";

const NO_ADJUST = { zoom: 1, offsetX: 0, offsetY: 0 };

export function BeforeAfterFields({ data, dispatch }: { data: PosterData; dispatch: ActionDispatch<[Action]> }) {
  return (
    <>
      <p className="text-xs text-[#7a6440]">
        Shown on the Development and Infrastructure templates. No photo? The label fills the panel, and a hex colour like
        #F59E0B paints it.
      </p>
      {(["before", "after"] as const).map((side) => {
        const imageKey = side === "before" ? "beforeImage" : "afterImage";
        const labelKey = side === "before" ? "beforeLabel" : "afterLabel";
        const title = side === "before" ? "Before" : "After";
        return (
          <div key={side} className="flex flex-col gap-3 rounded-lg border border-[#ecdcb4] bg-white/60 p-3">
            <span className="text-sm font-semibold text-[#7a6440]">{title}</span>
            <ImageSlot
              label={title}
              adjustable={false}
              value={{ photo: data[imageKey], ...NO_ADJUST }}
              onChange={(patch) => "photo" in patch && dispatch(setField(imageKey, patch.photo))}
            />
            <Field label="Label">
              <input
                className={inputCls}
                value={data[labelKey]}
                placeholder={side === "before" ? "#000" : "#F59E0B"}
                onChange={(e) => dispatch(setField(labelKey, e.target.value))}
              />
            </Field>
          </div>
        );
      })}
    </>
  );
}
