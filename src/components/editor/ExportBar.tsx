"use client";

import { useState, useSyncExternalStore, type RefObject } from "react";
import { Copy, Download, LoaderCircle, Share2 } from "lucide-react";
import { downloadBlob, posterFileName, renderPoster } from "@/lib/export";
import { btnCls } from "./ui";

type Busy = "download" | "share" | "copy" | null;
type Msg = { kind: "ok" | "error"; text: string } | null;

const ERROR = "Poster is too grand for this browser. Try a smaller photo, or use Chrome.";

// Feature checks run on the client only; the server snapshot hides both buttons.
const noop = () => () => {};
const canShareFiles = () =>
  typeof navigator !== "undefined" &&
  !!navigator.canShare?.({ files: [new File([], "p.png", { type: "image/png" })] });
const canCopyImage = () => typeof ClipboardItem !== "undefined" && !!navigator.clipboard?.write;

async function celebrate() {
  const confetti = (await import("canvas-confetti")).default;
  confetti({
    particleCount: 160,
    spread: 100,
    origin: { y: 0.8 },
    colors: ["#ff7a00", "#ffd23f", "#b30000", "#ffffff", "#1fbf5f"],
    disableForReducedMotion: true,
  });
}

export function ExportBar({ stageRef, headline }: { stageRef: RefObject<HTMLDivElement | null>; headline: string }) {
  const [busy, setBusy] = useState<Busy>(null);
  const [msg, setMsg] = useState<Msg>(null);
  const share = useSyncExternalStore(noop, canShareFiles, () => false);
  const copy = useSyncExternalStore(noop, canCopyImage, () => false);

  async function run(kind: Exclude<Busy, null>) {
    const node = stageRef.current;
    if (!node || busy) return;
    setBusy(kind);
    setMsg(null);
    const name = posterFileName(headline);
    try {
      if (kind === "copy") {
        // Pass the promise straight in: Safari needs ClipboardItem created inside the click.
        await navigator.clipboard.write([new ClipboardItem({ "image/png": renderPoster(node) })]);
        setMsg({ kind: "ok", text: "Copied. Paste it anywhere." });
      } else if (kind === "share") {
        const blob = await renderPoster(node);
        try {
          await navigator.share({ files: [new File([blob], name, { type: "image/png" })], title: headline });
          setMsg({ kind: "ok", text: "Shared. The nation thanks you." });
        } catch (e) {
          if (e instanceof DOMException && e.name === "AbortError") return; // user closed the sheet
          downloadBlob(blob, name); // share blocked (e.g. took too long after the tap): download instead
          setMsg({ kind: "ok", text: "Sharing was blocked, so it downloaded instead." });
        }
      } else {
        downloadBlob(await renderPoster(node), name);
        setMsg({ kind: "ok", text: "Downloaded. Now go post it." });
      }
      celebrate();
    } catch {
      setMsg({ kind: "error", text: kind === "copy" ? "This browser won't copy images. Download it instead." : ERROR });
    } finally {
      setBusy(null);
    }
  }

  const icon = (k: Exclude<Busy, null>, Icon: typeof Download) =>
    busy === k ? <LoaderCircle size={16} className="animate-spin" aria-hidden /> : <Icon size={16} aria-hidden />;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#ecdcb4] bg-[#fff8e7]/95 px-4 py-3 md:static md:border-0 md:bg-transparent md:px-0 md:pt-4 md:pb-0">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => run("download")}
          disabled={!!busy}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[#b3001b] px-4 py-3 text-[15px] font-semibold text-white hover:bg-[#8f0016] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b3001b]"
        >
          {icon("download", Download)}
          {busy === "download" ? "Making your poster…" : "Download PNG"}
        </button>
        {share && (
          <button type="button" onClick={() => run("share")} disabled={!!busy} className={btnCls} aria-label="Share poster">
            {icon("share", Share2)}
            <span className="hidden sm:inline">Share</span>
          </button>
        )}
        {copy && (
          <button type="button" onClick={() => run("copy")} disabled={!!busy} className={btnCls} aria-label="Copy image">
            {icon("copy", Copy)}
            <span className="hidden sm:inline">Copy</span>
          </button>
        )}
      </div>
      <p
        aria-live="polite"
        className={`min-h-5 pt-1.5 text-center text-sm ${msg?.kind === "error" ? "text-[#b3001b]" : "text-[#3d6b1f]"}`}
      >
        {msg?.text}
      </p>
    </div>
  );
}
