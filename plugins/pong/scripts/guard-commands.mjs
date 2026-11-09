#!/usr/bin/env node
// PreToolUse hook for Bash/PowerShell. Exit 2 = block the command; stderr goes back to Claude.
// Cross-platform (Windows/macOS/Linux), no dependencies.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

let input = {};
try { input = JSON.parse(readFileSync(0, "utf8") || "{}"); } catch { process.exit(0); }

const cmd = String(input?.tool_input?.command ?? "");
const cwd = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
if (!cmd) process.exit(0);

const block = (msg) => { process.stderr.write(`Blocked by pong guard: ${msg}\n`); process.exit(2); };
// Start of a command segment: beginning, or after ; & | && || ( or a newline.
const seg = String.raw`(?:^|[;&|(\n]\s*)`;
const has = (re) => new RegExp(re, "i").test(cmd);

// 1. Claude never pushes. You review and open the PR.
if (has(`${seg}git\\s+push\\b`)) block("git push is not allowed. Stop and let the user push / open the PR.");

// 2. No history-destroying git.
if (has(`${seg}git\\s+(reset\\s+--hard|clean\\s+-[a-z]*f|checkout\\s+--\\s+\\.|branch\\s+-D)`))
  block("destructive git command. Ask the user first.");

// 3. Recursive deletes only on build/cache folders.
const SAFE = String.raw`(?:\.\/)?(?:node_modules|dist|build|out|target|coverage|\.cache|\.next|\.turbo|\.pytest_cache|\.mypy_cache|\.ruff_cache|__pycache__|\.venv)\/?`;
const rmRecursive = new RegExp(`${seg}rm\\s+(-[a-z]*r[a-z]*f?|-[a-z]*f[a-z]*r)[a-z]*\\s+(.+)`, "i").exec(cmd);
if (rmRecursive) {
  const targets = rmRecursive[2].split(/[;&|]/)[0].trim().split(/\s+/);
  const ok = targets.every((t) => new RegExp(`^${SAFE}$`, "i").test(t));
  if (!ok) block(`recursive delete of "${targets.join(" ")}". Only build/cache folders (node_modules, dist, build, .venv, ...) may be removed.`);
}
if (has(`${seg}Remove-Item\\b.*-Recurse`)) {
  const args = /Remove-Item\s+([^;|&\n]*)/i.exec(cmd)[1].split(/\s+/).filter(Boolean);
  const targets = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (/^-(Path|LiteralPath)$/i.test(a)) { targets.push(args[++i] ?? ""); continue; }
    if (!a.startsWith("-")) targets.push(a);
  }
  const clean = (t) => t.replace(/^["']|["']$/g, "").replace(/\\/g, "/");
  if (!targets.length || !targets.every((t) => new RegExp(`^${SAFE}$`, "i").test(clean(t))))
    block("recursive Remove-Item outside build/cache folders.");
}

// 4. Use the project's package manager (detected from its lockfile).
const lock = (f) => existsSync(join(cwd, f));
const js = lock("pnpm-lock.yaml") ? "pnpm" : lock("yarn.lock") ? "yarn" : lock("bun.lockb") || lock("bun.lock") ? "bun" : lock("package-lock.json") ? "npm" : null;
if (js) {
  const others = ["npm", "pnpm", "yarn", "bun"].filter((p) => p !== js);
  for (const p of others) {
    if (has(`${seg}${p}\\s+(install|i|add|remove|uninstall|run|exec|ci|update|up)\\b`))
      block(`this project uses ${js} (found its lockfile). Re-run with ${js} instead of ${p}.`);
  }
}
if (lock("uv.lock") && has(`${seg}(python\\s+-m\\s+)?pip3?\\s+install\\b`))
  block("this project uses uv (found uv.lock). Use `uv add <pkg>` or `uv sync` instead of pip install.");
if (lock("poetry.lock") && has(`${seg}(python\\s+-m\\s+)?pip3?\\s+install\\b`))
  block("this project uses Poetry (found poetry.lock). Use `poetry add <pkg>` instead of pip install.");

process.exit(0);
