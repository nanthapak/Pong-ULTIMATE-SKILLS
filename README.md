# Pong ULTIMATE Skills

My personal Claude Code workflow, packaged as plugins so I can install it into
any Python or TypeScript project.

| Plugin | What it is | Install when |
|---|---|---|
| **`pong`** | Core: software engineering basics (plan → implement → verify → review) | Always |
| **`pong-ui`** | Add-on: uses UI reference images in `docs/ui/` at every step | The project has a UI |

The add-on plugs into the core through **extension points**, so there's only
one copy of each core skill and every core improvement reaches both.

**Plan** an idea into docs and tickets, then **build** each ticket with
subagents: Opus plans, Sonnet implements, a fresh Opus reviews. Hooks stop
Claude from pushing, deleting things or using the wrong package manager.

## Install (once per machine)

In Claude Code:
```
/plugin marketplace add nanthapak/Pong-ULTIMATE-SKILLS
/plugin install pong@pong-ultimate-skills
```
For projects with a UI, also install the add-on. Use `--scope project` so it's
only on for that project:
```
/plugin install pong-ui@pong-ultimate-skills --scope project
```
Requires Node on your PATH (the hooks are Node scripts, so they work on Windows,
macOS and Linux without jq or bash).

Check it loaded: `/skills` should list the eight `pong:` skills (plus
`pong-ui:setup` if you installed the add-on), and `/agents` the three `pong:` agents.

## Use it

```
/pong:init-project                          # once per project: CLAUDE.md, docs/, tickets/, permissions
                                            # (with pong-ui: also docs/ui/; drop your reference images there)

/pong:plan-project "a CLI that turns CSV timesheets into PDF invoices"
                                            # grill → PRD → spec → tickets, pausing after each

/pong:run-ticket T-001                      # build one ticket: plan → your OK → implement → verify → review
/pong:run-ticket T-002                      # …and so on, in the order in tickets/README.md
```
You review each finished ticket and push / open the PR yourself.

## What's inside

### Planning skills
| Skill | Writes | What it does |
|---|---|---|
| `/pong:plan-project <idea>` | all of the below | Runs the four steps in order, pausing for your OK after each. Skips or updates steps already done |
| `/pong:grill <idea>` | `docs/decisions.md` | Interviews you one question at a time, always with a suggested answer, until every decision is made |
| `/pong:prd` | `docs/prd.md` | What and why: problem, users, numbered user stories (US-1…), scope, success criteria |
| `/pong:spec` | `docs/spec.md` | How: stack, real commands, modules, data, interfaces, decisions, testing |
| `/pong:tickets` | `tickets/T-*.md`, `tickets/README.md` | Vertical-slice tickets with `depends_on`, covered stories and real check commands; index with build order and story coverage |

### Building skills
| Skill | What it does |
|---|---|
| `/pong:init-project` | Detects Python (uv/Poetry/pip) or TypeScript (pnpm/npm/yarn/bun); writes CLAUDE.md with real commands; creates `docs/`, `tickets/`; pre-approves safe commands |
| `/pong:run-ticket <id>` | Plan (Opus) → **waits for your OK** → implement (Sonnet) → verify → review (Opus) → hand off |
| `/pong:verify-app` | Typecheck, lint, test, build, smoke. Reports PASS/FAIL. "Done" means this passed |

### Agents (called by `run-ticket`)
| Agent | Model | Job |
|---|---|---|
| `ticket-planner` | Opus | Writes `tickets/<id>.plan.md` detailed enough for a cheaper model. Lists open questions instead of guessing. Never edits code |
| `implementer` | Sonnet | Follows the plan task by task with tests. Stops if the plan is wrong. Commits, never pushes |
| `reviewer` | Opus | Fresh-context review: spec, bugs, simplicity, standards, tests. Never edits |

### Hooks (always on)
- **guard-commands:** blocks `git push`, `reset --hard`, `clean -f`, `branch -D`,
  recursive deletes outside build/cache folders, the wrong package manager
  (detected from the lockfile), and `pip install` in uv/Poetry projects.
- **format-on-edit:** formats each edited file with the project's own
  ruff/black or prettier/biome. Does nothing if none is installed.

## The `pong-ui` add-on

Put screenshots, mockups or inspiration images in `docs/ui/` and list them in
`docs/ui/README.md` with a **Kind**: `exact` (match closely), `mockup` (layout
and content) or `inspiration` (overall feel). Add them **before**
`/pong:plan-project`; you can add more later.

| Add-on skill | Extends | What it adds |
|---|---|---|
| `/pong-ui:setup` | init-project | Creates `docs/ui/` + README index; adds a Screenshot command to CLAUDE.md |
| `grill-ui` | grill | Opens every image first; asks about states, clicks, window size, theme; UI table in decisions |
| `prd-ui` | prd | Screens table: screen → image → user stories |
| `spec-ui` | spec | UI stack defaults, design tokens from the images, screen → component map, Screenshot command |
| `tickets-ui` | tickets | `ui:` field on tickets, screenshot checks, tokens first, screen coverage |
| `build-ui` | ticket-planner, implementer | Planner describes each screen in words; implementer opens images and uses tokens |
| `check-ui` | run-ticket, verify-app, reviewer | Screenshots to `tickets/<id>.screens/`, compared with the references |

Only `setup` is a command you type; the rest load automatically inside the core steps.

### Files a project ends up with
```
my-project/
├── CLAUDE.md
├── .claude/settings.json      ← permissions from init-project
├── docs/
│   ├── decisions.md           ← grill
│   ├── prd.md                 ← prd
│   ├── spec.md                ← spec
│   └── ui/                    ← pong-ui: your reference images + README.md
└── tickets/
    ├── README.md              ← index, build order, story coverage
    ├── T-001-walking-skeleton.md
    ├── T-001.plan.md          ← ticket-planner
    └── …
```

## How extension points work

Every core skill and agent has an **Extensions** section:

> Check the available skills for any whose description starts with "Extends"
> and names `pong:<step>`. Load each one that applies and follow it alongside
> these instructions.

So an add-on skill only needs a description like
`Extends pong:spec. Adds … Use when …`. With the add-on uninstalled, nothing
matches and the core runs exactly as before.

**Writing a new add-on** (e.g. `pong-api` for API projects):
1. Copy `plugins/pong-ui/` to `plugins/pong-api/`, rename it in its `plugin.json`.
2. Write one skill per step you want to extend, each with a description starting
   `Extends pong:<step>` and `user-invocable: false`.
3. Add it to `.claude-plugin/marketplace.json`.

Steps you can extend: `init-project`, `grill`, `prd`, `spec`, `tickets`,
`run-ticket`, `verify-app`, `ticket-planner`, `implementer`, `reviewer`.

## Improving it

This is meant to grow. The loop:

1. **Use it** on a real project.
2. **Notice** where it went wrong: a vague plan, a bad ticket, a question grill
   should have asked, a command the guard should block.
3. **Fix the right file:**

   | Problem | Edit |
   |---|---|
   | Grill missed an important question | `skills/grill/SKILL.md` → "What to cover" |
   | PRD/spec missing a section you always want | `skills/prd/templates/PRD.md` / `skills/spec/templates/SPEC.md` |
   | Tickets too big/small/vague | `skills/tickets/SKILL.md` → "How to slice" |
   | Sonnet keeps going off track | `agents/ticket-planner.md` (more detail), or `model: opus` in `agents/implementer.md` |
   | Review misses things | `agents/reviewer.md` → "Check" list |
   | Claude did something it must never do | `scripts/guard-commands.mjs` |
   | Different stack defaults | `skills/spec/SKILL.md` → "Stack defaults" |
   | Anything UI-specific | the matching skill in `plugins/pong-ui/skills/` |

4. **Test locally** before pushing:
   ```
   claude --plugin-dir ./plugins/pong --plugin-dir ./plugins/pong-ui
   claude plugin validate .
   ```
5. **Release:** bump `version` in the changed plugin's `.claude-plugin/plugin.json`,
   add a line to `CHANGELOG.md`, push. Then on each machine: `/plugin` →
   Marketplaces → update.

Tips for editing skills:
- Keep each `SKILL.md` under ~500 lines; put long reference material in a separate file next to it and link it.
- The `description` decides when Claude uses a skill. Say what it does **and** when to use it.
- Don't add `disable-model-invocation: true` to a skill another skill calls
  (grill, prd, spec, tickets, verify-app, or any add-on skill), or it can't be loaded.
- Keep UI-only ideas out of the core. If it only matters for some projects, it
  belongs in an add-on.

## License
MIT
