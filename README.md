# Pong ULTIMATE Skills

My personal Claude Code workflow, packaged as a plugin so I can install it into
any Python or TypeScript project.

**Plan** an idea into docs and tickets, then **build** each ticket with
subagents: Opus plans, Sonnet implements, a fresh Opus reviews. Hooks stop
Claude from pushing, deleting things or using the wrong package manager.

## Install (once per machine)

In Claude Code:
```
/plugin marketplace add nanthapak/Pong-ULTIMATE-SKILLS
/plugin install pong@pong-ultimate-skills
```
Requires Node on your PATH (the hooks are Node scripts, so they work on Windows,
macOS and Linux without jq or bash).

Check it loaded: `/skills` should list the eight `pong:` skills, and `/agents`
the three `pong:` agents.

## Use it

```
/pong:init-project                          # once per project: CLAUDE.md, docs/, tickets/, permissions

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

### Files a project ends up with
```
my-project/
├── CLAUDE.md
├── .claude/settings.json      ← permissions from init-project
├── docs/
│   ├── decisions.md           ← grill
│   ├── prd.md                 ← prd
│   └── spec.md                ← spec
└── tickets/
    ├── README.md              ← index, build order, story coverage
    ├── T-001-walking-skeleton.md
    ├── T-001.plan.md          ← ticket-planner
    └── …
```

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

4. **Test locally** before pushing:
   ```
   claude --plugin-dir ./plugins/pong
   claude plugin validate .
   ```
5. **Release:** bump `version` in `plugins/pong/.claude-plugin/plugin.json`,
   add a line to `CHANGELOG.md`, push. Then on each machine: `/plugin` →
   Marketplaces → update.

Tips for editing skills:
- Keep each `SKILL.md` under ~500 lines; put long reference material in a separate file next to it and link it.
- The `description` decides when Claude uses a skill. Say what it does **and** when to use it.
- Don't add `disable-model-invocation: true` to a skill another skill calls
  (grill, prd, spec, tickets, verify-app), or the orchestrator can't run it.

## License
MIT
