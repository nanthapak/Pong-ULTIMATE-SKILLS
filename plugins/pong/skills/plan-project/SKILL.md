---
name: plan-project
description: Runs the whole planning pipeline (grill, PRD, spec, tickets) in order, pausing for the user's OK after each step. Use when starting a new project or a big new feature.
disable-model-invocation: true
argument-hint: [the idea in one sentence]
---

Idea: $ARGUMENTS

Copy this checklist and tick it off as you go:

```
- [ ] 0. Check setup
- [ ] 1. Grill    → docs/decisions.md
- [ ] 2. PRD      → docs/prd.md
- [ ] 3. Spec     → docs/spec.md
- [ ] 4. Tickets  → tickets/
```

## 0. Check setup
- If there's no CLAUDE.md or no `tickets/` folder, suggest running
  `/pong:init-project` first and wait for my answer.
- If any of the output files above already exist, show me which ones and ask
  whether to **skip** that step, **update** it, or **redo** it.

## 1–4. Run each step
For each step in order, use its skill: `pong:grill`, then `pong:prd`, then
`pong:spec`, then `pong:tickets`. Pass the idea above to `pong:grill`.

After each step:
1. Show a short summary of what it produced.
2. **Stop and wait for my OK.** I may want to edit the file first.
3. Only then start the next step.

If a step can't proceed (for example the spec finds the PRD has too many open
questions), go back to the step that can fix it instead of guessing.

## Finish
Show the ticket build order from `tickets/README.md` and tell me to start with
`/pong:run-ticket T-001`.
