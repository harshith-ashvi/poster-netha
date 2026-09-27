import { PosterCanvas } from "@/components/poster/PosterCanvas";
import { COPY, newPerson, samplePoster } from "@/lib/presets";
import type { PosterData } from "@/lib/types";

// ponytail: Phase 2 review page (sample + stress variants). Phase 3 replaces this with the editor.
const s = samplePoster();
const six = ["Sharma Ji", "Priya", "Ravi", "Aunty Ji", "Bunty", "Chintu Bhai"].map((n, i) =>
  newPerson(n, ["CEO", "Design Lead", "Scrum Master", "Well-Wisher", "Intern", "Chai Supplier"][i]),
);

const VARIANTS: PosterData[] = [
  s,
  { ...s, themeId: "royal-blue", leaders: six, headline: "A GREAT ACHIEVEMENT FOR THE COMMUNITY" },
  { ...s, themeId: "emerald-green", leaders: [], headline: "SUCCESSFULLY COMPLETED", achievement: "Fixed a typo in README" },
  {
    ...s,
    themeId: "crimson-red",
    leaders: s.leaders.slice(0, 1),
    headline: "PROUD MOMENT FOR THE NATION",
    achievement:
      "Deployed to production on a Friday evening at 6:58 PM without running the tests and nothing broke (yet), a historic first for the entire engineering department",
    heroTagline: "Tireless Servant of the Codebase, Defender of Main Branch, Slayer of Merge Conflicts",
  },
  {
    ...s,
    themeId: "neon-startup",
    lang: "hi",
    leaders: s.leaders.slice(0, 3),
    headline: COPY.hi.headlines[0],
    blessingsLabel: COPY.hi.blessingsLabels[0],
  },
];

export default function CreatePage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 p-4 sm:grid-cols-2">
      {VARIANTS.map((d, i) => (
        <PosterCanvas key={i} data={d} />
      ))}
    </main>
  );
}
