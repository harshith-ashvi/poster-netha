import type { ActionDispatch } from "react";
import { setField, type Action } from "@/lib/reducer";
import type { PosterData } from "@/lib/types";
import { ImageSlot } from "./ImageSlot";
import { Field, inputCls } from "./ui";

type Props = { data: PosterData; dispatch: ActionDispatch<[Action]> };

export function TextFields({ data, dispatch }: Props) {
  return (
    <>
      <Field label="Headline">
        <input className={inputCls} value={data.headline} onChange={(e) => dispatch(setField("headline", e.target.value))} />
      </Field>
      <Field label="Your achievement" hint="The smaller the win, the funnier the poster.">
        <textarea
          className={`${inputCls} min-h-24 resize-y`}
          value={data.achievement}
          placeholder="Fixed a typo in the README"
          onChange={(e) => dispatch(setField("achievement", e.target.value))}
        />
      </Field>
      <Field label="Big number" hint="Shown on the Achievement and Infrastructure templates.">
        <input
          className={inputCls}
          value={data.bigNumber}
          placeholder="1 DOWNLOAD"
          onChange={(e) => dispatch(setField("bigNumber", e.target.value))}
        />
      </Field>
      <Field label="Footer">
        <input className={inputCls} value={data.footerText} onChange={(e) => dispatch(setField("footerText", e.target.value))} />
      </Field>
      <label className="flex items-center gap-2 text-sm font-semibold text-[#3d2a14]">
        <input
          type="checkbox"
          className="size-4 accent-[#b3001b]"
          checked={data.showWatermark}
          onChange={(e) => dispatch(setField("showWatermark", e.target.checked))}
        />
        Show “made with” watermark
      </label>
    </>
  );
}

export function HeroFields({ data, dispatch }: Props) {
  const update = (patch: Partial<PosterData["hero"]>) => dispatch({ type: "updateHero", patch });
  return (
    <>
      <ImageSlot label="Your" value={data.hero} onChange={update} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Name">
          <input className={inputCls} value={data.hero.name} onChange={(e) => update({ name: e.target.value })} />
        </Field>
        <Field label="Role">
          <input className={inputCls} value={data.hero.role} onChange={(e) => update({ role: e.target.value })} />
        </Field>
      </div>
      <Field label="Tagline">
        <input className={inputCls} value={data.heroTagline} onChange={(e) => dispatch(setField("heroTagline", e.target.value))} />
      </Field>
    </>
  );
}

