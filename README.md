# Pong ULTIMATE Skills

My personal Claude Code workflow, packaged as two plugins.

## Which one do I install?

| You're building | Install | You get |
|---|---|---|
| Backend, CLI, library, service, anything without a UI | **`pong`** | The engineering workflow: plan → implement → verify → review |
| Frontend, desktop app, anything with a UI | **`painter`** | Everything in `pong` (installed automatically) **plus** design taste, UI references, design direction, critique and polish |

One install, either way.

```
/plugin marketplace add nanthapak/Pong-ULTIMATE-SKILLS

/plugin install pong@pong-ultimate-skills        # any software
/plugin install painter@pong-ultimate-skills     # UI work (brings pong with it)
```
Add `--scope project` to install for just the current project. Requires Node
on your PATH (the hooks are Node scripts; they work on Windows, macOS and Linux).

---

## pong: the engineering workflow

```
/pong:init-project                 # once per project: CLAUDE.md, docs/, tickets/, permissions
/pong:plan-project "<your idea>"   # grill → PRD → spec → tickets, pausing after each
/pong:run-ticket T-001             # plan → your OK → implement → verify → review
```
You review each finished ticket and push / open the PR yourself.

### Skills
| Skill | Writes | What it does |
|---|---|---|
| `/pong:init-project` | CLAUDE.md, docs/, tickets/, .claude/settings.json | Detects Python (uv/Poetry/pip) or TypeScript (pnpm/npm/yarn/bun), fills in real commands, pre-approves safe ones |
| `/pong:plan-project <idea>` | everything below | Runs the four planning steps in order, pausing for your OK after each |
| `/pong:grill <idea>` | docs/decisions.md | Interviews you one question at a time, always with a suggested answer |
| `/pong:prd` | docs/prd.md | What and why: problem, users, numbered user stories, scope, success criteria |
| `/pong:spec` | docs/spec.md | How: stack, commands, modules, data, interfaces, decisions, testing |
| `/pong:tickets` | tickets/ | Vertical-slice tickets with dependencies and real checks; index with build order |
| `/pong:run-ticket <id>` | code, tickets/<id>.plan.md | Opus plans → **waits for your OK** → Sonnet implements → verify → Opus reviews |
| `/pong:verify-app` | — | Typecheck, lint, test, build, smoke. PASS/FAIL |

### Agents (used by run-ticket)
| Agent | Model | Job |
|---|---|---|
| `ticket-planner` | Opus | Writes a plan detailed enough for a cheaper model; lists open questions; never edits code |
| `implementer` | Sonnet | Follows the plan task by task with tests; stops if the plan is wrong; commits, never pushes |
| `reviewer` | Opus | Fresh-context review: spec, bugs, simplicity, standards, tests; never edits |

### Hooks (always on)
- **guard-commands:** blocks `git push`, `reset --hard`, `clean -f`, `branch -D`,
  recursive deletes outside build/cache folders, the wrong package manager
  (from the lockfile), and `pip install` in uv/Poetry projects.
- **format-on-edit:** formats each edited file with the project's own ruff/black or prettier/biome.

---

## painter: pong + design

Same commands as pong, and every step becomes UI-aware. Plus four of its own:

```
/painter:setup                     # once: docs/ui/ for reference images + DESIGN.md
                                   #   (runs automatically inside /pong:init-project)
  → drop screenshots / mockups / inspiration into docs/ui/
/painter:direction                 # pick a look: 3 directions → DESIGN.md tokens
/pong:plan-project "<your idea>"   # now asks about screens, states and the design
/pong:run-ticket T-001             # now builds to DESIGN.md and screenshot-checks the UI
/painter:critique [screen]         # anytime: screenshot at 3 sizes, prioritized findings
/painter:polish                    # fix the critique in batches, before/after screenshots
```

### Commands
| Command | What it does |
|---|---|
| `/painter:setup` | Creates `docs/ui/README.md` (your references, each with a Kind: `exact`, `mockup` or `inspiration`) and `docs/ui/DESIGN.md`; adds a Screenshot command to CLAUDE.md |
| `/painter:direction` | Proposes three distinct directions grounded in your product and references (mode, dials, palette, type, signature detail), then writes the chosen design system to DESIGN.md with AA-checked colors |
| `/painter:critique` | Screenshots each screen at three sizes and judges it against DESIGN.md, the references and the taste rules. Reports HIGH/MED/LOW findings with file:line and a fix. Never edits |
| `/painter:polish` | Fixes critique findings in batches (shared components and tokens first), re-runs tests, shows before → after |

### What painter adds inside pong's steps (automatic)
| Step | Added by | What changes |
|---|---|---|
| grill | `plan-ui` | Opens your images first; asks about screens, states, sizes, mode; runs direction if DESIGN.md is empty |
| prd | `plan-ui` | Screens table: screen → reference → user stories |
| spec | `plan-ui` | UI stack defaults, Screenshot command, screen → component map |
| tickets | `plan-ui` | `ui:` field, screenshot checks, tokens-and-components ticket first, screen coverage |
| planner / implementer | `build-ui` | Planner describes each screen in words; implementer uses tokens only and self-checks |
| verify / review | `check-ui` | Screenshots at 3 sizes vs references, DESIGN.md and the taste checklist |

### The taste rules
`painter:taste` is the quality bar every painter step uses. It covers:
- **Direction:** surface mode (Persuade, Experience, Operate, Read) and three dials (variance, motion, density)
- **Craft:** typography, color, layout, component states, motion and accessibility
- **Banned:** a list of patterns that look AI-generated

Your `DESIGN.md` and reference images always win over its defaults.

It's written from ideas in popular skills on skills.sh: Anthropic's
*frontend-design*, *taste-skill*, *impeccable* and Vercel's *web-design-guidelines*.
It's our own text, so there's nothing extra to install or trust.

---

## Files a project ends up with
```
my-project/
├── CLAUDE.md
├── .claude/settings.json      ← permissions (init-project)
├── docs/
│   ├── decisions.md           ← grill
│   ├── prd.md                 ← prd
│   ├── spec.md                ← spec
│   └── ui/                    ← painter only
│       ├── README.md          ← your reference images, listed
│       ├── DESIGN.md          ← design system (direction)
│       └── 01-main.png …
└── tickets/
    ├── README.md              ← index, build order, coverage
    ├── T-001-walking-skeleton.md
    ├── T-001.plan.md          ← ticket-planner
    └── T-004.screens/         ← painter: screenshots from run-ticket
```

---

## How painter plugs into pong

Every pong skill and agent has an **Extensions** section: it looks for
installed skills whose description starts with "Extends" and names that step
(e.g. `pong:spec`), and follows them too. Without painter, nothing matches and
pong runs exactly as it does on its own. painter declares `pong` as a
dependency in its `plugin.json`, which is why installing it brings pong along.

**Making another one** (e.g. `pong-api` for API projects):
1. Copy `plugins/painter/`, rename it in `plugin.json`, keep `"dependencies": ["pong"]`.
2. Write skills whose description starts `Extends pong:<step>.` with `user-invocable: false`.
3. Add it to `.claude-plugin/marketplace.json`.

Steps you can extend: `init-project`, `grill`, `prd`, `spec`, `tickets`,
`run-ticket`, `verify-app`, `ticket-planner`, `implementer`, `reviewer`.

---

## Improving it

1. **Use it** on a real project.
2. **Notice** what went wrong.
3. **Fix the right file:**

   | Problem | Edit |
   |---|---|
   | Grill missed a question | `plugins/pong/skills/grill/SKILL.md` |
   | PRD/spec missing a section | `plugins/pong/skills/prd/templates/PRD.md` / `spec/templates/SPEC.md` |
   | Tickets too big/small/vague | `plugins/pong/skills/tickets/SKILL.md` |
   | Sonnet goes off track | `plugins/pong/agents/ticket-planner.md`, or `model: opus` in `implementer.md` |
   | Review misses things | `plugins/pong/agents/reviewer.md` |
   | Claude did something it must never do | `plugins/pong/scripts/guard-commands.mjs` |
   | UI looks generic / a new design rule | `plugins/painter/skills/taste/SKILL.md` |
   | Directions all look alike | `plugins/painter/skills/direction/SKILL.md` |
   | UI planning/building/checking | `plugins/painter/skills/plan-ui`, `build-ui`, `check-ui` |

4. **Test locally:**
   ```
   claude --plugin-dir ./plugins/pong --plugin-dir ./plugins/painter
   claude plugin validate .
   ```
5. **Release:** bump `version` in the changed plugin's `plugin.json`, add a
   line to `CHANGELOG.md`, push. Then `/plugin` → Marketplaces → update.

Tips:
- Keep each `SKILL.md` under ~500 lines; move long reference material to a file next to it.
- A skill's `description` decides when Claude uses it: say what it does **and** when.
- Don't put `disable-model-invocation: true` on a skill another skill loads.
- Rules for all software go in **pong**; UI-only rules go in **painter**.

## License
MIT
