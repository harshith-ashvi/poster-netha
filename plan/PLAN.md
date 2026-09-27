# PLAN.md: "Celebrate Anything Like an Indian Politician" Poster Generator

Working name: **Vikas Ho Gaya** (change it in one place: `lib/config.ts`).
Goal: a fun, shareable, client-side web app. A tiny achievement goes in, a giant over-the-top political-style flex banner comes out, ready to post on X/Instagram.
Success metric: someone sees a generated poster and immediately sends it to a friend.

### Current repo state (already done, do not redo)
- Scaffolded with `create-next-app`: **Next.js 16.3.6, React 19.2, TypeScript, Tailwind CSS v4, App Router, `src/` directory**, ESLint.
- Package manager is **bun** (`bun add`, `bun dev`, `bun run build`). Do not use npm/yarn/pnpm.
- Path alias `@/*` → `./src/*`.
- Tailwind v4 is CSS-first: config lives in `src/app/globals.css` (`@import "tailwindcss"` + `@theme`), there is no `tailwind.config.js`.
- This Next.js version has breaking changes vs. older training data. **Before writing Next-specific code, read the relevant guide in `node_modules/next/dist/docs/`** (fonts: `01-app/01-getting-started/13-fonts.md`, metadata/OG: `14-metadata-and-og-images.md`, static export: `01-app/02-guides/static-exports.md`).
- `CLAUDE.md` contains only `@AGENTS.md` (auto-managed by `next dev`). Append project rules **below** that line; never remove it.

---

## 0. Ground rules (append these to CLAUDE.md, below `@AGENTS.md`)

1. **No backend, no database, no auth, no analytics beyond optional page views.** Everything runs in the browser. Photos never leave the device (say this in the UI, it is a selling point).
2. **Parody only.** Ship placeholder silhouettes, never real people's photos. No real party names, symbols, flags, or logos. No election-related templates. Keep it about tech and personal wins.
3. **Over-the-top is the requirement.** When unsure, add more gold, more gradient, more text hierarchy.
4. **Templates are the product.** Spend most of the time on how the posters look.
5. **Ship in one day.** Anything not in the V1 scope goes to `BACKLOG.md`.

---

## 1. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, `src/`), React 19, TypeScript |
| Package manager | bun |
| Styling | Tailwind CSS v4 for the editor UI; plain CSS/inline styles inside poster templates |
| State | `useReducer` in the `/create` page, single `PosterData` object, passed down as props (no Zustand, no context unless prop drilling gets painful) |
| Export | `html-to-image` (`toPng`) |
| Fonts | `next/font/google`, each exposed as a CSS variable: Anton, Teko, Rozha One, Poppins, Noto Sans Devanagari (hi), Noto Sans Tamil (ta), Noto Sans Telugu (te), Noto Sans Kannada (kn) |
| Image upload | `<input type=file>` → downscale via canvas → data URL (data URLs, not blob URLs, so `html-to-image` embeds them reliably) |
| Images in UI | Plain `<img>`, not `next/image` (default loader is unsupported with static export, and posters must use data URLs anyway) |
| Optional cutout | `@imgly/background-removal`, lazy-loaded, behind a toggle (Phase 6, cuttable) |
| Confetti UI | `canvas-confetti` (on export) |
| Hosting | Vercel, `output: 'export'` in `next.config.ts` |

---

## 2. Project structure

All app code lives under `src/` (import with `@/…`). `public/` stays at the repo root.

```
src/app/
  layout.tsx              # fonts, metadata
  globals.css             # Tailwind v4 import + @theme + theme CSS variables
  page.tsx                # landing + "Make a poster" CTA + example gallery
  create/page.tsx         # server wrapper + metadata; renders <Editor /> (client, owns the useReducer)
  opengraph-image.png     # best example poster (Phase 7, file convention)
  icon.svg                # garland favicon (Phase 7, replaces favicon.ico)
src/components/
  editor/
    TemplatePicker.tsx
    TextFields.tsx
    ImageSlot.tsx         # upload + zoom/offset sliders + remove (shape is decided by the template)
    LeaderList.tsx        # add/remove 1 to 6 leaders (photo, name, role)
    BeforeAfterFields.tsx
    ThemePicker.tsx       # palette presets
    CaptionPresets.tsx    # randomize button + language toggle
    ExportBar.tsx         # download, share, copy
  poster/
    PosterCanvas.tsx      # fixed 1080x1350 stage + scale-to-fit wrapper
    templates/
      Blessings.tsx
      Inauguration.tsx
      Achievement.tsx
      Development.tsx
      Infrastructure.tsx
    parts/                # shared pieces: Garland, Ribbon, LeaderBadge, GoldFrame,
                          # Confetti, BeforeAfter, Watermark, Photo, Silhouette (inline SVG placeholder)
src/lib/
  config.ts               # site name, tagline, watermark text
  types.ts                # PosterData, TemplateId, Person, Theme, Lang
  presets.ts              # captions (per lang), themes, sample data
  reducer.ts              # posterReducer + initial state
  export.ts               # toPng wrapper + Safari workaround
  images.ts               # file -> downscaled data URL
  fit.ts                  # length-based font sizing (fitFont)
public/
  textures/               # gold, flowers, rays, generated by us
BACKLOG.md
```

---

## 3. Data model

```ts
// src/lib/types.ts
export type TemplateId =
  | 'blessings' | 'inauguration' | 'achievement' | 'development' | 'infrastructure';

export type Lang = 'en' | 'hi' | 'ta' | 'te' | 'kn';

export interface Theme {
  id: string;              // 'saffron-gold' | 'royal-blue' | ...
  name: string;
  vars: Record<string, string>; // --bg-from, --bg-to, --accent, --text, --plate; applied as inline style on the stage
}

export interface Person {
  id: string;              // crypto.randomUUID()
  name: string;
  role: string;            // "CEO", "Design Lead"
  photo?: string;          // data URL
  zoom: number;            // 1 to 3
  offsetX: number;         // -50 to 50 (%)
  offsetY: number;
}

export interface PosterData {
  template: TemplateId;
  lang: Lang;
  themeId: string;
  headline: string;        // "HISTORIC DEVELOPMENT"
  achievement: string;     // "Button background changed from #000 to #F59E0B"
  bigNumber: string;       // "1 DOWNLOAD", "30 DAYS", "1 KM" (Achievement, Infrastructure)
  blessingsLabel: string;  // "With the blessings of"
  leaders: Person[];       // 0 to 6, top row / side rows
  hero: Person;            // the user: big bottom-center portrait
  heroTagline: string;     // "Frontend Development & Revolutionary UI Infrastructure"
  beforeImage?: string;    // data URL; if missing, BeforeAfter renders text-only
  afterImage?: string;
  beforeLabel: string;
  afterLabel: string;
  footerText: string;      // "Best wishes from the well-wishers of ..."
  showWatermark: boolean;  // default true
  stickers: {              // Phase 6 toggles, all default false
    garlands: boolean;
    flowerShower: boolean;
    congratsStrip: boolean;
    ticker: boolean;
  };
}

// src/lib/reducer.ts actions (reducer stays pure: callers create UUIDs / random copy)
export type Action =
  | { type: 'setField'; key: K; value: PosterData[K] }       // typed per key; also used for template switch
  | { type: 'merge'; patch: Partial<PosterData> }           // randomCopy(lang), samplePoster(), emptyPoster(), lang switch
  | { type: 'addLeader'; person: Person }                   // person = newPerson(); no-op at 6
  | { type: 'removeLeader'; id: string }
  | { type: 'updateLeader'; id: string; patch: Partial<Person> }
  | { type: 'updateHero'; patch: Partial<Person> }
  | { type: 'toggleSticker'; key: keyof Stickers };
```

Templates own layout only; they read everything from `PosterData`. Localized copy (headline, blessings label) lives in `presets.ts` keyed by `Lang`; switching `lang` or pressing Randomize writes the chosen strings into `PosterData` so users can still edit them.

---

## 4. Poster rendering rules (important for export quality)

- Every poster renders inside a **fixed 1080 x 1350 px** stage (4:5, best for Instagram/X).
- The editor preview scales this stage with `transform: scale(k)` inside a wrapper sized to `1080k x 1350k`. **Export from the unscaled stage node**, not the scaled wrapper (otherwise you get blurry or clipped output).
- Use `object-fit: cover` plus `transform: scale(zoom) translate(x%, y%)` for photo slots.
- Avoid features `html-to-image` handles poorly: `backdrop-filter`, CSS `mix-blend-mode` on images, cross-origin images. Use only local/data-URL assets.
- Wait for fonts before export: `await document.fonts.ready`.
- **Safari workaround:** call `toPng` twice and keep the second result (first call often misses images/fonts).
- Export at `pixelRatio: 2` for crisp output (2160 x 2700), fall back to 1 on mobile if memory errors occur.
- Downscale uploaded images to max 1200 px on the long edge on load (keeps export fast and memory safe).

---

## 5. Templates (the heart of the project)

All five share the same `PosterData` so switching templates keeps the user's content.

| # | Template | Layout idea | Default headline |
|---|---|---|---|
| 1 | **Blessings** | Saffron-to-gold gradient, big row of 3 to 6 leader cutouts on top, "With the blessings of" ribbon, hero portrait bottom-left, achievement text center-right | "GRAND CELEBRATION" |
| 2 | **Inauguration** | Ribbon-cutting motif (CSS ribbon and scissors emoji), garlands on both sides, leaders in two rows, red carpet strip at the bottom with hero | "HISTORIC INAUGURATION" |
| 3 | **Achievement** | Trophy/starburst background, huge number or short text ("1 DOWNLOAD"), leaders framed in gold circles, hero in a large medallion | "A GREAT ACHIEVEMENT FOR THE COMMUNITY" |
| 4 | **Development** | Blue/green "vikas" palette, before/after split panel dominates the middle, leaders in a top strip, hero in the corner with tagline | "HISTORIC DEVELOPMENT" |
| 5 | **Infrastructure** | Road/construction stripes, "1 KM"-style giant number, hazard-tape borders, before/after strip, leaders across the top | "PROJECT COMPLETED" |

Shared parts (build once, reuse): `GoldFrame`, `Garland`, `Ribbon`, `LeaderBadge` (photo + name + role plate), `BeforeAfter`, `Confetti`, `Watermark`.

### Theme presets (each is a set of CSS variables)
Saffron Gold, Royal Blue, Emerald Green, Crimson Red, Neon Startup (a joke on tech-bro purple/blue).

### Copy bank (`lib/presets.ts`)
Headlines: "HISTORIC DEVELOPMENT", "A GREAT ACHIEVEMENT FOR THE COMMUNITY", "GRAND INAUGURATION", "SUCCESSFULLY COMPLETED", "PROUD MOMENT FOR THE NATION".
Blessings labels: "With the blessings of", "Under the visionary leadership of", "With the guidance of", "Inspired by".
Hero taglines: "Architect of Revolutionary UI Infrastructure", "Tireless Servant of the Codebase", "Visionary Leader of One Download".
Footer: "Best wishes from the well-wishers and supporters of ..."
Add Hindi/Tamil/Telugu/Kannada versions of headlines and labels (see Phase 6).
Include a **"Randomize copy"** button.

---

## 6. Build phases

Each phase ends with something runnable. Commit after each one.

### Phase 1: Scaffold (30 min) ✅ Done
1. ~~`create-next-app`~~ **Done** (see "Current repo state").
2. `bun add html-to-image canvas-confetti` and `bun add -d @types/canvas-confetti`.
3. Set `output: 'export'` in `next.config.ts`.
4. Replace the Geist fonts in `src/app/layout.tsx` with the Section 1 fonts via `next/font/google`, each with a `variable`; map them in `globals.css` `@theme` (e.g. `--font-display: var(--font-anton)`). Set real `metadata` title/description from `lib/config.ts`.
5. Create `src/lib/config.ts`, `types.ts`, `presets.ts`, `reducer.ts` with the data model, themes and copy bank above.
6. Append Section 0 + Section 4 rules to `CLAUDE.md` below `@AGENTS.md`.
7. Add `BACKLOG.md` (seed with Section 10).
8. Replace boilerplate `src/app/page.tsx` with a blank landing page; delete unused `public/*.svg` boilerplate.

**Done when:** `bun dev` shows a blank landing page with the correct fonts, and `bun run build` succeeds with static export.

### Phase 2: Poster stage and one template (1.5 hr) ✅ Done
1. Build `PosterCanvas.tsx` with the fixed 1080x1350 stage and scale-to-fit wrapper (ResizeObserver on the container).
2. Build the shared parts: `GoldFrame`, `LeaderBadge`, `Ribbon`, `Watermark`.
3. Build `Blessings.tsx` fully, using hardcoded sample data first, with the inline SVG `Silhouette` placeholder (no fetch, always exports).
4. Iterate on the look until it is genuinely ridiculous. Do not move on until it makes you laugh.

**Done when:** a sample poster renders at full quality and scales cleanly in the browser.

### Phase 3: Editor and state (1.5 hr) ✅ Done
1. Wire `posterReducer` (Section 3 actions) with `useReducer` in `components/editor/Editor.tsx` (client); `create/page.tsx` stays a server component for metadata.
2. `/create` layout: preview on top (sticky on mobile), controls below; side-by-side on desktop.
3. Build `TextFields`, `LeaderList`, `ThemePicker`, `TemplatePicker` (tiny thumbnails).
4. Build `ImageSlot`: file input, preview, zoom slider, X/Y offset sliders, remove button. Use `lib/images.ts` to downscale on upload.
5. Wire everything so edits update the poster live.

**Done when:** you can upload faces, edit all text, and see the Blessings poster update live.

### Phase 4: Export and share (1 hr) ✅ Built (Chrome verified; Safari / iOS / Android need a manual check)
1. `lib/export.ts`: `await document.fonts.ready`, double-`toPng` for Safari, `pixelRatio: 2`, filename from the headline.
2. `ExportBar`: "Download PNG" button, confetti burst on success.
3. Web Share API (`navigator.share` with a `File`) on mobile, with fallback to download. Add "Copy image" via `navigator.clipboard.write` where supported.
4. Add a loading state and a friendly error message ("Poster is too grand for this browser, try a smaller photo").
5. Test on Chrome, Safari desktop, iOS Safari, and Android Chrome.

**Done when:** downloaded PNG matches the preview exactly, on every browser above.

### Phase 5: Remaining four templates (2 hr)
Build `Inauguration`, `Achievement`, `Development`, `Infrastructure` using the shared parts. Add `BeforeAfter` component (image or text-only mode, arrow between panels). Each template must handle: 0 leaders, 6 leaders, missing hero photo, very long text (clamp with `line-clamp` and shrink-to-fit font sizing).

**Done when:** all five templates render correctly with empty, sample, and stress-test data.

### Phase 6: Comedy features (1 hr)
1. "Randomize copy" and "Load sample" buttons.
2. Language toggle for headline and blessings label (Hindi, Tamil, Telugu, Kannada). Users still type their own achievement text in any language; Noto fonts cover the scripts.
3. Optional **background removal** toggle per photo (lazy import of `@imgly/background-removal`, show a progress state, warn about the first-time model download). If it slows things down, cut it and put it in the backlog.
4. Sticker extras (toggles): garlands, flower shower, "Congratulations" strip, giant scrolling ticker text at the bottom.

### Phase 7: Landing page, polish, safety (1 hr)
1. Landing page: one-liner ("Celebrate anything like an Indian politician"), an example gallery of 4 to 6 pre-made posters (using placeholders), big CTA.
2. Footer note: "Parody. Not affiliated with any political party. Photos never leave your device."
3. Metadata: title, description, `metadataBase`, OG image via `src/app/opengraph-image.png` (one of the best example posters), favicon via `src/app/icon.svg` (garland emoji in an SVG; delete `favicon.ico`).
4. Mobile pass: everything usable one-handed at 375 px width.
5. Watermark: small "made with {SITE_NAME}" on posters, with a toggle to hide it (default on).

### Phase 8: Ship and launch (30 min)
1. Deploy to Vercel, add a custom domain if you have one.
2. Make 5 to 10 increasingly absurd posters (see launch ideas below).
3. Post them on X and Instagram with the link.

---

## 7. Prompts for Claude Code

Give Claude Code one phase at a time. Suggested opening prompt:

> Read plan/PLAN.md and CLAUDE.md. We are building this project phase by phase. Start with Phase 1 only. When it is done, run the dev server, verify it works, and summarize what you did. Do not start Phase 2 until I say so.

For the template phases:

> Build the Blessings template per PLAN.md Section 5. It should be loud and over-the-top: saffron-gold gradient, gold frame, a top row of leader badges with circular photos, a "With the blessings of" ribbon, a big hero portrait with tagline, and the achievement text in huge bold type. Use only placeholder silhouettes. Render it at a fixed 1080x1350 stage. Show me a screenshot when done and then push it further.

For export bugs:

> The exported PNG differs from the preview (fonts/images missing). Follow the rendering rules in plan/PLAN.md Section 4, export from the unscaled stage, await document.fonts.ready, and apply the double-toPng Safari workaround.

---

## 8. Testing checklist (before launch)

- [ ] Poster exports at 2160x2700 and matches the preview
- [ ] Works with 0, 1, and 6 leaders
- [ ] Long achievement text does not overflow
- [ ] Hindi/Tamil text renders correctly in the export
- [ ] iOS Safari export works (double-call workaround)
- [ ] Web Share works on a real phone
- [ ] No network requests are made with user photos (check the Network tab)
- [ ] Parody disclaimer visible
- [ ] Lighthouse mobile score is reasonable (no giant unoptimized assets)
- [ ] OG image shows on X/WhatsApp link previews

---

## 9. Launch content ideas

1. "Historic Day: I changed the background color of a button" (Development template, before/after of a button).
2. "1 download achieved" with 5 leader photos as silhouettes.
3. "Fixed a typo in README, dedicated to the nation."
4. "Completed 30 days at the gym" (Infrastructure template, "30 DAYS" as the giant number).
5. "Deployed to prod on a Friday" (Inauguration template, ribbon cutting).
6. Thread on X: the making of, plus "reply with your achievement and I'll make your poster" for the first few replies (great engagement).

---

## 10. Backlog (do NOT build in V1)

- Accounts, saved posters, gallery of user posters
- AI-generated captions or images
- More templates or a template marketplace
- Video/GIF export
- Custom sticker uploads, drag-to-reposition elements
- Logo upload slot on posters
- Multi-page or carousel posters
- Paid tier, ads, tracking

---

## 11. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Users upload real politicians' faces | Parody disclaimer, no political templates, no party symbols, no preloaded real photos |
| Export differs from preview | Fixed stage, export from unscaled node, wait for fonts, double `toPng` |
| WebKit export drops/misplaces `text-shadow` and offset `box-shadow` (seen in Playwright WebKit, unconfirmed in real Safari) | Test real Safari first. If confirmed: replace offset shadows in templates with layered elements (stacked text copies for the 3D headline, pseudo-element blocks for drop shadows) |
| Huge photos crash mobile | Downscale on upload to 1200 px, pixelRatio fallback |
| Scope creep | Phase gates, `BACKLOG.md`, one-day timebox |
| Copyright of assets | Only self-made SVG/CSS art and Google Fonts |
