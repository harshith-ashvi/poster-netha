import { getFontEmbedCSS, toBlob } from "html-to-image";

const W = 1080;
const H = 1350;

// Font CSS is the slow part (fetches + inlines every font file); build it once and reuse.
let fontCSS: Promise<string> | undefined;

// Render the unscaled poster stage to a PNG blob. Tries 2x (2160x2700), falls back to 1x on memory errors.
export async function renderPoster(node: HTMLElement): Promise<Blob> {
  await document.fonts.ready;
  fontCSS ??= getFontEmbedCSS(node).catch((e) => {
    fontCSS = undefined; // don't cache a failure
    throw e;
  });
  const fontEmbedCSS = await fontCSS;
  try {
    return await render(node, 2, fontEmbedCSS);
  } catch {
    return render(node, 1, fontEmbedCSS);
  }
}

async function render(node: HTMLElement, pixelRatio: number, fontEmbedCSS: string): Promise<Blob> {
  const opts = { width: W, height: H, pixelRatio, fontEmbedCSS };
  await toBlob(node, opts); // Safari: the first pass often misses images/fonts, keep the second
  const blob = await toBlob(node, opts);
  if (!blob) throw new Error("Empty render");
  return blob;
}

export function posterFileName(headline: string): string {
  const slug = headline
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${slug || "poster"}.png`;
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
