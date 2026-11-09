---
name: verify-app
description: Runs the project's typecheck, lint, tests, build and smoke test and reports PASS or FAIL. Use after any code change and before saying work is done.
---

## 1. Find the commands
Use the commands under `## Commands` in the project's CLAUDE.md. For any that
are missing, detect them and tell me which ones you guessed:

| Check | Python (pyproject.toml) | TypeScript (package.json) |
|---|---|---|
| Typecheck | `pyright` or `mypy .` (whichever is configured) | the `typecheck` script, else `tsc --noEmit` |
| Lint | `ruff check .` | the `lint` script |
| Tests | `pytest -q` | the `test` script |
| Build | skip unless a build backend needs it | the `build` script |
| Smoke | the `Smoke test` command in CLAUDE.md | the `Smoke test` command in CLAUDE.md |

Run Python tools through the project's runner when it has one (`uv run …`,
`poetry run …`). Run JS scripts with the project's package manager.

## 2. Run them in order
```
- [ ] Typecheck
- [ ] Lint
- [ ] Tests
- [ ] Build
- [ ] Smoke test
```
Stop at the first failure.

## 3. Report
```
VERIFY: PASS | FAIL
typecheck: pass/fail/skipped
lint:      pass/fail/skipped
tests:     pass/fail/skipped
build:     pass/fail/skipped
smoke:     pass/fail/skipped
<full output of the failing step>
```
Never report PASS unless every command that ran exited 0. "Skipped" is only
allowed when the project genuinely has no such step, and you must say so.
