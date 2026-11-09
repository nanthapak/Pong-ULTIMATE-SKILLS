---
name: tickets
description: Breaks the PRD and spec into small vertical-slice tickets in tickets/, each with dependencies and real check commands, ready for /pong:run-ticket. Use after /pong:spec, or when the user asks to split work into tickets or tasks.
---

Create ticket files in `tickets/` using [templates/TICKET.md](templates/TICKET.md).

## Inputs
1. `docs/spec.md` and `docs/prd.md`. **Both required.** If either is missing,
   stop and suggest `/pong:spec` or `/pong:prd`.
2. Existing files in `tickets/`. Never renumber or overwrite existing tickets.
   Continue numbering after the highest one.

## How to slice
- **Vertical slices, not layers.** Each ticket delivers something that works
  end to end, however thin. Not "build the database layer", but "save one
  invoice and read it back".
- **T-001 is the walking skeleton:** project scaffold, the Commands from the spec
  all run (even if tests are trivial), and the smoke test passes. Every other
  ticket depends on it.
- **One testable concern per ticket.** If you can't write a clear acceptance
  check, the ticket is too vague. Split it or sharpen it.
- **Right-sized:** one `/pong:run-ticket` session, roughly 1–5 files changed.
  A small MVP is usually **8–15 tickets**. More than 20 means they're too small.
- **Fewest possible dependencies.** Only add a `depends_on` entry when the
  ticket truly can't start without the other one. Fewer dependencies means
  more tickets can run in parallel later.
- **Every user story is covered.** Each US-n from the PRD maps to at least one ticket.

## Each ticket must have
- `id`, `title`, `status: todo`, `depends_on`, and `stories` (the US-n it covers)
- A **Goal** a person can check
- **Acceptance checks** that are real commands from the spec's Commands
  section, narrowed to this ticket (e.g. `uv run pytest tests/test_parser.py`),
  plus at most one manual check
- **Notes**: the spec sections to read, and what's out of scope

File name: `tickets/T-003-short-slug.md`.

## Then write the index
Create or update `tickets/README.md`:

```markdown
# Tickets

| ID | Title | Depends on | Stories | Status |
|---|---|---|---|---|
| T-001 | Walking skeleton | — | — | todo |

## Build order
1. T-001
2. T-002, T-003   ← can run in parallel
3. …

## Story coverage
| Story | Tickets |
|---|---|
| US-1 | T-002, T-004 |
```

## Check before finishing
Fix any of these before you report:
- [ ] Every `depends_on` points to a ticket that exists
- [ ] No dependency cycles
- [ ] Every PRD user story appears in the coverage table
- [ ] Every ticket has at least one acceptance check that is a real command
- [ ] T-001 is the walking skeleton and has no dependencies

## Finish
Show the index table and build order, and ask if anything should be merged,
split or reordered. Suggest the next step: `/pong:run-ticket T-001`.
