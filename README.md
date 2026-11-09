# Pong ULTIMATE Skills

My personal Claude Code setup, packaged as a plugin marketplace so I can install
it into any Python or TypeScript project.

Opus plans each ticket, Sonnet implements it, a fresh Opus reviews it, and hooks
keep Claude from pushing, deleting things or using the wrong package manager.

## Install (once per machine)

In Claude Code:
```
/plugin marketplace add nanthapak/Pong-ULTIMATE-SKILLS
/plugin install pong@pong-ultimate-skills
```
Requires Node on your PATH (the hooks are Node scripts, so they work on Windows,
macOS and Linux without jq or bash).

Check it loaded: `/skills` should list `pong:run-ticket`, `pong:verify-app`,
`pong:init-project`, and `/agents` should list the three `pong:` agents.

### Companion skills (recommended)
The pipeline works without them, but uses them when they're installed:
```bash
npx skills add https://github.com/mattpocock/skills --skill setup-matt-pocock-skills
npx skills add https://github.com/mattpocock/skills --skill grill-me
npx skills add https://github.com/mattpocock/skills --skill to-prd
npx skills add https://github.com/mattpocock/skills --skill to-spec
npx skills add https://github.com/mattpocock/skills --skill to-tickets
npx skills add https://github.com/mattpocock/skills --skill tdd
npx skills add https://github.com/obra/superpowers --skill writing-plans
```
Optional, for less over-built code:
```
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```

## Use it in a project

```
/pong:init-project             # once: CLAUDE.md, docs/, tickets/, safe permissions
/setup-matt-pocock-skills      # once: pick "local markdown", point it at tickets/

/grill-me → /to-prd → /to-spec → /to-tickets     # plan the project (read each output)

/pong:run-ticket T-001         # build one ticket: plan → OK? → implement → verify → review
```
You review the result and push / open the PR yourself.

## What's inside

```
plugins/pong/
├── skills/
│   ├── init-project/   Bootstraps a project (detects Python/TS, uv/poetry/pnpm/npm...)
│   ├── run-ticket/     The orchestrator: plan → implement → verify → review → hand off
│   └── verify-app/     Typecheck, lint, test, build, smoke. "Done" means this passed
├── agents/
│   ├── ticket-planner  Opus. Writes tickets/<id>.plan.md. Never edits code
│   ├── implementer     Sonnet. Follows the plan task by task, TDD, commits, never pushes
│   └── reviewer        Opus. Fresh-context review, no edits
├── hooks/hooks.json
└── scripts/
    ├── guard-commands.mjs   Blocks: git push, reset --hard, clean -f, branch -D,
    │                        rm -rf outside build/cache dirs, wrong package manager
    │                        (detected from the lockfile), pip install in uv/Poetry projects
    └── format-on-edit.mjs   Formats edited files with the project's own ruff/black
                             or prettier/biome. Does nothing if none is installed
```

## Updating

Edit files here, bump `version` in `plugins/pong/.claude-plugin/plugin.json`,
push, then in Claude Code run `/plugin` → Marketplaces → update.

While developing, test without pushing:
```
claude --plugin-dir ./plugins/pong
```

## Tuning
- Sonnet needing too many fixes? Make plans more detailed first. Still bad?
  Change `model: sonnet` to `model: opus` in `agents/implementer.md`.
- A rule Claude keeps breaking? Add it to the project's CLAUDE.md "Mistakes log".
  If it must *never* happen, add a check to `scripts/guard-commands.mjs`.
