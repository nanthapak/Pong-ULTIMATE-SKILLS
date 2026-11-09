#!/usr/bin/env node
// PostToolUse hook: format the file Claude just edited with the project's own formatter.
// Never blocks (always exits 0). Cross-platform, no dependencies.
import { existsSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";
import { spawnSync } from "node:child_process";

let input = {};
try { input = JSON.parse(readFileSync(0, "utf8") || "{}"); } catch { process.exit(0); }

const file = input?.tool_input?.file_path;
const cwd = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
if (!file || !existsSync(file)) process.exit(0);

const win = process.platform === "win32";
const run = (bin, args) => {
  const r = spawnSync(bin, args, { cwd, stdio: "ignore", shell: win, timeout: 25000 });
  return r.status === 0;
};
const local = (name) => {
  const p = join(cwd, "node_modules", ".bin", win ? `${name}.cmd` : name);
  return existsSync(p) ? p : null;
};
const venv = (name) => {
  const p = win ? join(cwd, ".venv", "Scripts", `${name}.exe`) : join(cwd, ".venv", "bin", name);
  return existsSync(p) ? p : null;
};
const onPath = (name) => spawnSync(win ? "where" : "which", [name], { stdio: "ignore" }).status === 0;

const ext = extname(file).toLowerCase();
const JS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".css", ".scss", ".html", ".md", ".vue", ".svelte"];

if (JS.includes(ext)) {
  const biome = local("biome");
  const prettier = local("prettier");
  if (biome && existsSync(join(cwd, "biome.json"))) run(biome, ["format", "--write", file]);
  else if (prettier) run(prettier, ["--write", "--log-level", "silent", file]);
} else if (ext === ".py" || ext === ".pyi") {
  const ruff = venv("ruff") || (onPath("ruff") ? "ruff" : null);
  const black = venv("black") || (onPath("black") ? "black" : null);
  if (ruff) run(ruff, ["format", "--quiet", file]);
  else if (black) run(black, ["-q", file]);
}

process.exit(0);
