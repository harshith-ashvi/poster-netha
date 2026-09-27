import { ArrowRight } from "lucide-react";
import type { PosterData } from "@/lib/types";
import s from "./parts.module.css";

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

// Image mode: photo fills the panel, label goes in the tag.
// Text mode: label is the star; a hex colour like "#F59E0B" paints the whole panel (for button-colour flexes).
function Panel({ image, label, tag, tagColor, textSize }: { image?: string; label: string; tag: string; tagColor: string; textSize: number }) {
  const hex = !image && HEX.test(label.trim());
  return (
    <div className={s.baPanel} style={hex ? { background: label.trim() } : undefined}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- data URL only
        <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div className={s.baText} style={{ fontSize: textSize }}>
          {label || "?"}
        </div>
      )}
      <span className={s.baTag} style={{ background: tagColor }}>
        {image && label ? label : tag}
      </span>
    </div>
  );
}

export function BeforeAfter({ data, textSize = 64 }: { data: PosterData; textSize?: number }) {
  return (
    <div className={s.ba}>
      <Panel image={data.beforeImage} label={data.beforeLabel} tag="Before" tagColor="#4a4a4a" textSize={textSize} />
      <div className={s.baArrow}>
        <ArrowRight size={64} strokeWidth={3.5} color="#3b0a00" aria-hidden />
      </div>
      <Panel image={data.afterImage} label={data.afterLabel} tag="After" tagColor="#1f8f3a" textSize={textSize} />
    </div>
  );
}
