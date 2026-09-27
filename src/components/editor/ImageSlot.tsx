"use client";

import { useState, useTransition } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { fileToDataUrl } from "@/lib/images";
import type { Person } from "@/lib/types";
import { btnCls, Slider } from "./ui";

type Img = Pick<Person, "photo" | "zoom" | "offsetX" | "offsetY">;

export function ImageSlot({
  value,
  label,
  onChange,
  adjustable = true,
}: {
  value: Img;
  label: string;
  onChange: (patch: Partial<Img>) => void;
  adjustable?: boolean; // false hides zoom/offset sliders (before/after images just cover their panel)
}) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function onFile(file: File | undefined) {
    if (!file) return;
    setError("");
    startTransition(async () => {
      try {
        const photo = await fileToDataUrl(file);
        onChange({ photo, zoom: 1, offsetX: 0, offsetY: 0 });
      } catch {
        setError("Couldn't read that photo. Pick a JPG, PNG or WebP.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="size-14 shrink-0 overflow-hidden rounded-full border-2 border-[#d4a017] bg-[#f7cf6b]">
          {value.photo && (
            // eslint-disable-next-line @next/next/no-img-element -- local data URL preview
            <img src={value.photo} alt="" className="size-full object-cover" />
          )}
        </div>
        <label className={`${btnCls} cursor-pointer focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#b3001b]`}>
          <ImagePlus size={16} aria-hidden />
          {pending ? "Processing…" : value.photo ? "Replace photo" : "Upload photo"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label={`${label} photo`}
            disabled={pending}
            onChange={(e) => {
              onFile(e.target.files?.[0]);
              e.target.value = ""; // allow re-picking the same file
            }}
          />
        </label>
        {value.photo && (
          <button type="button" className={btnCls} onClick={() => onChange({ photo: undefined })} aria-label={`Remove ${label} photo`}>
            <Trash2 size={16} aria-hidden />
          </button>
        )}
      </div>
      {error && <p className="text-sm text-[#b3001b]" role="alert">{error}</p>}
      {adjustable && value.photo && (
        <div className="flex flex-col gap-1">
          <Slider label="Zoom" value={value.zoom} min={1} max={3} step={0.05} onChange={(zoom) => onChange({ zoom })} />
          <Slider label="Left/right" value={value.offsetX} min={-50} max={50} step={1} onChange={(offsetX) => onChange({ offsetX })} />
          <Slider label="Up/down" value={value.offsetY} min={-50} max={50} step={1} onChange={(offsetY) => onChange({ offsetY })} />
        </div>
      )}
    </div>
  );
}
