import { WATERMARK } from "@/lib/config";

export function Watermark() {
  return <span className="font-sans text-[18px] font-semibold whitespace-nowrap text-white/75">{WATERMARK}</span>;
}
