// Run: bun scripts/check-export.ts
import assert from "node:assert/strict";
import { posterFileName } from "../src/lib/export";

assert.equal(posterFileName("HISTORIC DEVELOPMENT!"), "historic-development.png");
assert.equal(posterFileName("ऐतिहासिक विकास"), "ऐतिहासिक-विकास.png");
assert.equal(posterFileName("!!!"), "poster.png");
console.log("export checks ok");
