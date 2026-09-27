@AGENTS.md

# Project: Vikas Ho Gaya (see plan/PLAN.md)

Build phase by phase per `plan/PLAN.md`. Package manager: **bun**. App code in `src/`, import via `@/…`.

## Ground rules
1. No backend, no database, no auth, no analytics beyond optional page views. Everything runs in the browser. Photos never leave the device.
2. Parody only. Placeholder silhouettes, never real people's photos. No real party names, symbols, flags, logos. No election templates. Keep it about tech and personal wins.
3. Over-the-top is the requirement. When unsure: more gold, more gradient, more text hierarchy.
4. Templates are the product. Spend most of the time on how posters look.
5. Anything not in V1 scope goes to `BACKLOG.md`.

## Poster rendering rules
- Every poster renders inside a fixed 1080x1350 px stage. Preview scales it with `transform: scale(k)` in a wrapper sized 1080k x 1350k. Export from the unscaled stage node.
- Photo slots: `object-fit: cover` + `transform: scale(zoom) translate(x%, y%)`.
- No `backdrop-filter`, no `mix-blend-mode` on images, no cross-origin images. Local/data-URL assets only. Plain `<img>`, not `next/image`.
- Before export: `await document.fonts.ready`. Call `toPng` twice, keep the second (Safari). `pixelRatio: 2`, fall back to 1 on memory errors.
- Downscale uploads to max 1200 px long edge.
- `posterReducer` stays pure: UUIDs/random copy are created by the caller and passed in via actions.

## Styling
- Tailwind only, no CSS modules. Long or shared poster styles are `@utility` classes in `src/app/globals.css` (`gold-text` is the shared 3D headline).
- Inside posters use arbitrary px (`p-[18px]`, `text-[38px]`), never the rem spacing scale: the 1080x1350 stage must not change with the viewer's browser font size.
- Arbitrary breakpoints must be in rem (`min-[56.25rem]:`), or Tailwind can't order them against `sm`/`md`.
- Runtime-computed values (font sizes from `fitFont`, poster scale) stay in inline `style`; Tailwind only sees class names written out in full.
