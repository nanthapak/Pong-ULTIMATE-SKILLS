---
name: spec
description: Writes docs/spec.md, the technical design covering stack, architecture, data, interfaces and testing, from the PRD. Use after /pong:prd, or when the user asks how something should be built or for an architecture or spec.
---

Write `docs/spec.md` using [templates/SPEC.md](templates/SPEC.md).

## Extensions
Before starting, check the available skills for any whose description starts
with "Extends" and names `pong:spec`. Load each one that applies to this
project with the Skill tool and follow it alongside these instructions. If none exist, carry on.

## Inputs
1. `docs/prd.md`. **Required.** If it doesn't exist, stop and suggest `/pong:prd`.
2. `docs/decisions.md`, CLAUDE.md, and any existing code. In an existing
   codebase, follow its current patterns unless there's a strong reason not to.
3. Any existing `docs/spec.md`. Update it rather than starting over, and say what changed.

## Stack defaults
Use what's already decided. If nothing is, propose these defaults and ask me to confirm before writing:

| | Python | TypeScript |
|---|---|---|
| Package manager | uv | pnpm |
| Typecheck | pyright | tsc --noEmit (strict) |
| Lint + format | ruff | biome (or eslint + prettier if already used) |
| Tests | pytest | vitest |
| CLI | typer | commander |
| HTTP API | FastAPI | Hono |
| Validation | pydantic | zod |

## Rules
- **How, not what.** Don't repeat the PRD. Link user stories by number (US-1).
- **Every module gets one job.** Name it, say what it owns, and say what it must not do.
- **Write the real commands** (dev, test, typecheck, lint, build, smoke) — they
  go into CLAUDE.md and every ticket's checks.
- **Decisions come with alternatives.** For each important choice, one line on
  what else was considered and why not.
- **Design for testing.** Say where the seams are: what gets unit tested,
  what's faked, and what the smoke test proves.
- **No speculative features.** Nothing that no user story needs.
- **Keep it short.** Aim for one or two screens.

## Finish
1. Save `docs/spec.md`.
2. If the Commands section differs from CLAUDE.md, update CLAUDE.md too.
3. Show the module list and the key decisions, and ask if anything's wrong.
4. Suggest the next step: `/pong:tickets`.
