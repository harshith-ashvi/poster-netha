"use client";

import { memo, type ActionDispatch } from "react";
import { PosterCanvas } from "@/components/poster/PosterCanvas";
import { samplePoster, TEMPLATES } from "@/lib/presets";
import { setField, type Action } from "@/lib/reducer";
import type { TemplateId } from "@/lib/types";

const SAMPLE = samplePoster();

// Thumbnails use sample data so they don't re-render on every keystroke; only theme changes redraw them.
const Thumb = memo(function Thumb({ template, themeId }: { template: TemplateId; themeId: string }) {
  return <PosterCanvas data={{ ...SAMPLE, template, themeId }} />;
});

export function TemplatePicker({
  template,
  themeId,
  dispatch,
}: {
  template: TemplateId;
  themeId: string;
  dispatch: ActionDispatch<[Action]>;
}) {
  return (
    <fieldset className="grid grid-cols-3 gap-3 sm:grid-cols-5">
      <legend className="sr-only">Template</legend>
      {TEMPLATES.map((t) => (
        <label key={t.id} className="flex cursor-pointer flex-col gap-1 text-center text-xs font-semibold text-[#3d2a14]">
          <input
            type="radio"
            name="template"
            className="peer sr-only"
            checked={template === t.id}
            onChange={() => dispatch(setField("template", t.id))}
          />
          <span
            aria-hidden
            className="block overflow-hidden rounded-md opacity-70 ring-2 ring-transparent peer-checked:opacity-100 peer-checked:ring-[#b3001b] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#b3001b]"
          >
            <Thumb template={t.id} themeId={themeId} />
          </span>
          {t.name}
        </label>
      ))}
    </fieldset>
  );
}
