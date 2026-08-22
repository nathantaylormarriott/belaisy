import { readFileSync, writeFileSync } from "node:fs";

const FORM_PATH = "/forms.html";
const serverPath = ".netlify/functions-internal/server/server.mjs";

let content = readFileSync(serverPath, "utf8");

if (!content.includes(`"${FORM_PATH}"`)) {
  content = content.replace(
    'excludedPath: ["/.netlify/*"]',
    `excludedPath: ["/.netlify/*", "${FORM_PATH}"]`,
  );
  writeFileSync(serverPath, content);
}
