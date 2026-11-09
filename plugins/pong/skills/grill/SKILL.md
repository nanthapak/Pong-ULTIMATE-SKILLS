---
name: grill
description: Interviews the user one question at a time to turn a rough idea into clear, recorded decisions before any docs or code. Use when the user has a new idea, a vague feature, or asks to be grilled or stress-tested.
argument-hint: [the idea in one sentence]
---

Idea: $ARGUMENTS

## Extensions
Before starting, check the available skills for any whose description starts
with "Extends" and names `pong:grill`. Load each one that applies to this
project with the Skill tool and follow it alongside these instructions. If none exist, carry on.

Your job is to find every decision this idea needs, get the user to make it,
and write it down. You are not writing a PRD or code yet.

## Rules
- **One question per message.** Never a list of questions.
- **Always offer your recommended answer** with a one-line reason, so the user
  can just say "yes". Example: *"Where do invoices get saved? I'd suggest
  `./out/` next to the input file, because it's easy to find. OK?"*
- **Don't ask what you can look up.** If there's existing code, read it to
  answer questions yourself, and tell the user what you found.
- **Go deep before wide.** Follow a branch (e.g. "how does auth work?") until
  it's settled before moving to the next one.
- **Challenge, don't just collect.** Point out contradictions, missing edge
  cases, and scope that's too big for a first version.

## What to cover
Work through these in roughly this order, skipping what doesn't apply:

1. **Problem & user** — who has this problem, what do they do today, why is that bad?
2. **The MVP** — the smallest version that's actually useful. What's explicitly *not* in it?
3. **Core flow** — step by step, what does the user do and see?
4. **Data** — what goes in, what comes out, what's stored, where, in what format?
5. **Edge cases** — empty input, bad input, huge input, offline, duplicates, partial failure.
6. **Interfaces** — CLI flags / API endpoints / UI screens / files read and written.
7. **Stack** — language, framework, key libraries, package manager. Default to
   what the project already uses; otherwise suggest Python (uv, ruff, pyright,
   pytest) or TypeScript (pnpm, tsc, vitest).
8. **Done** — how will we know the MVP works? What would a smoke test check?

## Keep a decision log
After every few answers, update `docs/decisions.md`:

```markdown
# Decisions: <idea>

## Settled
- **<topic>:** <decision> — <one-line reason>

## Out of scope (for now)
- <thing>

## Open
- <question still unanswered>
```

## Finish
Stop when "Open" is empty, or the user says stop. Then:
1. Make sure `docs/decisions.md` is complete and saved.
2. Give a 5-line summary of the idea as it now stands.
3. Suggest the next step: `/pong:prd`.
