import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const now = new Date();
const date = now.toISOString().slice(0, 10);
const time = now.toTimeString().slice(0, 8).replace(/:/g, "-");

const runRoot = join("test-runs", date, `run-${time}`);
mkdirSync(runRoot, { recursive: true });

writeFileSync(
  join(runRoot, "run-metadata.json"),
  JSON.stringify(
    {
      startedAt: now.toISOString(),
      portalBaseURL: process.env.PORTAL_BASE_URL || "http://127.0.0.1:4000",
      command: "playwright test",
      args: process.argv.slice(2),
    },
    null,
    2
  )
);

const env = {
  ...process.env,
  PW_RUN_DIR: runRoot,
};

const playwrightArgs = ["playwright", "test", ...process.argv.slice(2)];
const result = spawnSync("npx", playwrightArgs, {
  stdio: "inherit",
  shell: true,
  env,
});

if (result.error) {
  console.error("Failed to run Playwright:", result.error.message);
  process.exit(1);
}

console.log(`\nArtifacts stored in: ${runRoot}`);
process.exit(result.status ?? 1);
