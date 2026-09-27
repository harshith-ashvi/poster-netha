import { WATERMARK } from "@/lib/config";
import s from "./parts.module.css";

export function Watermark() {
  return <span className={s.watermark}>{WATERMARK}</span>;
}
