import { ArrowRight } from "lucide-react";
import type { PosterData } from "@/lib/types";

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

// Image mode: photo fills the panel, label goes in the tag.
// Text mode: label is the star; a hex colour like "#F59E0B" paints the whole panel (for button-colour flexes).
function Panel({ image, label, tag, tagColor, textSize }: { image?: string; label: string; tag: string; tagColor: string; textSize: number }) {
  const hex = !image && HEX.test(label.trim());
  return (
    <div className="relative grid h-full flex-1 place-items-center overflow-hidden rounded-[14px] border-6 border-(--accent) bg-[#fffaf0] px-[56px] py-[16px] shadow-[0_0_0_4px_var(--plate)]" style={hex ? { background: label.trim() } : undefined}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- data URL only
        <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      ) : (
        <div className="max-w-full rounded-[10px] bg-white/88 px-[20px] py-[8px] text-center font-display leading-[1.05] text-[#5a0000] wrap-anywhere" style={{ fontSize: textSize }}>
          {label || "?"}
        </div>
      )}
      <span className="absolute top-[12px] left-[12px] rounded-[8px] px-[16px] pt-[4px] font-condensed text-[36px] leading-[1.1] text-white uppercase" style={{ background: tagColor }}>
        {image && label ? label : tag}
      </span>
    </div>
  );
}

export function BeforeAfter({ data, textSize = 64 }: { data: PosterData; textSize?: number }) {
  return (
    <div className="relative flex h-full items-center">
      <Panel image={data.beforeImage} label={data.beforeLabel} tag="Before" tagColor="#4a4a4a" textSize={textSize} />
      <div className="z-2 -mx-[44px] grid size-[110px] flex-none place-items-center rounded-full border-5 border-(--plate) bg-gold-conic">
        <ArrowRight size={64} strokeWidth={3.5} color="#3b0a00" aria-hidden />
      </div>
      <Panel image={data.afterImage} label={data.afterLabel} tag="After" tagColor="#1f8f3a" textSize={textSize} />
    </div>
  );
}
