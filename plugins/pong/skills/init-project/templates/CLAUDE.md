# <PROJECT NAME>

<One sentence: what this project does and who it's for.>

## Stack
- Language: <Python 3.x | TypeScript>
- Framework: <TODO>
- Package manager: <uv | poetry | pip | pnpm | npm | yarn | bun>

## Commands
- Dev:        `<cmd>`
- Typecheck:  `<cmd>`
- Lint:       `<cmd>`
- Test:       `<cmd>`
- Build:      `<cmd or "none">`
- Smoke test: `<cmd that proves the app starts, or "none">`

## Structure
- `src/`      <what lives here>
- `tests/`    <test layout>
- `docs/`     decisions.md, prd.md, spec.md
- `tickets/`  One file per ticket, plus `<id>.plan.md` written by the planner

## Workflow
- Planning (once per project/epic): /pong:plan-project <idea>
  (= /pong:grill → /pong:prd → /pong:spec → /pong:tickets)
- Building (once per ticket): /pong:run-ticket <id>

## Conventions
<!-- Only what Claude can't infer from the code. Keep it short. -->

## Mistakes log
<!-- Every time Claude gets something wrong, add ONE line here.
     If it must never happen, ask for a hook instead. -->
