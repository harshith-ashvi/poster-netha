// Run: bun scripts/check.ts
import assert from "node:assert/strict";
import { posterFileName } from "../src/lib/export";
import { copyForLang, samplePoster } from "../src/lib/presets";

assert.equal(posterFileName("HISTORIC DEVELOPMENT!"), "historic-development.png");
assert.equal(posterFileName("ऐतिहासिक विकास"), "ऐतिहासिक-विकास.png");
assert.equal(posterFileName("!!!"), "poster.png");

// Language switch translates preset copy (from any language) but keeps custom text.
const sample = samplePoster(); // "HISTORIC DEVELOPMENT", "With the blessings of"
const hi = copyForLang(sample, "hi");
assert.deepEqual(hi, { lang: "hi", headline: "ऐतिहासिक विकास", blessingsLabel: "के आशीर्वाद से" });
assert.equal(copyForLang({ ...sample, ...hi }, "ta").headline, "வரலாற்று வளர்ச்சி");
assert.equal(copyForLang({ ...sample, headline: "I FIXED CSS" }, "kn").headline, "I FIXED CSS");
console.log("checks ok");
