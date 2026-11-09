---
name: prd
description: Writes docs/prd.md, a product requirements doc covering what is being built and why, from the decision log and conversation. Use after /pong:grill, or when the user asks for a PRD or requirements.
---

Write `docs/prd.md` using [templates/PRD.md](templates/PRD.md).

## Inputs
Read, in this order:
1. `docs/decisions.md` (from `/pong:grill`): the main source.
2. This conversation.
3. Any existing `docs/prd.md`. If one exists, update it rather than starting over, and tell me what changed.

## Rules
- **Don't interview.** Write from what's already decided. If something
  important is missing, put it under "Open questions"; don't invent an answer.
  If more than 3 big things are missing, stop and suggest `/pong:grill` first.
- **What and why, not how.** No libraries, file names or architecture here;
  that's the spec's job.
- **User stories must be testable.** Each one should describe something a
  person could check by hand: "As a freelancer, I can run `invoice build
  hours.csv` and get a PDF", not "the system handles invoices".
- **Number the user stories** (US-1, US-2, …). The tickets will reference them.
- **Keep it short.** A small project's PRD fits on one or two screens.

## Finish
1. Save `docs/prd.md`.
2. Show the user stories list and the "Out of scope" list, and ask if anything's wrong.
3. Suggest the next step: `/pong:spec`.
