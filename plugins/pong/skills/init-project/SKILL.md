---
name: init-project
description: Sets up the current project for the pong workflow by creating CLAUDE.md, tickets/, docs/ and safe permissions for Python or TypeScript. Use once per new project.
disable-model-invocation: true
---

Set up this project for the pong workflow. Never overwrite an existing file
without showing me the diff and asking first.

```
- [ ] 1. Detect the stack
- [ ] 2. CLAUDE.md
- [ ] 3. Folders
- [ ] 4. Permissions
- [ ] 5. Report
```

## 1. Detect the stack
- `pyproject.toml` / `uv.lock` / `poetry.lock` / `requirements.txt` → Python (note uv, Poetry or pip)
- `package.json` + lockfile → TypeScript/JavaScript (note pnpm, yarn, bun or npm)
- Both → list both. Neither → ask me what the project will use.

Read `package.json` scripts and `pyproject.toml` tool sections to find the real
dev/test/typecheck/lint/build commands.

## 2. CLAUDE.md
If there is no CLAUDE.md, create it from [templates/CLAUDE.md](templates/CLAUDE.md)
and fill in everything you detected. Leave `<TODO>` only for what you truly
can't detect. If one exists, offer to add only the missing sections.

## 3. Folders
Create `docs/` and `tickets/`, and copy the ticket template from
`${CLAUDE_SKILL_DIR}/../tickets/templates/TICKET.md` to `tickets/_TEMPLATE.md`.

## 4. Permissions
Pre-approve safe commands in `.claude/settings.json` (merge with any existing
`permissions.allow`; keep everything already there). Use the detected tools:

- Always: `Bash(git status)`, `Bash(git diff:*)`, `Bash(git log:*)`, `Bash(git add:*)`,
  `Bash(git commit:*)`, `Bash(git checkout -b:*)`
- Python + uv: `Bash(uv run pytest:*)`, `Bash(uv run ruff:*)`, `Bash(uv run pyright:*)`, `Bash(uv run mypy:*)`, `Bash(uv sync:*)`
- Python + pip/venv: `Bash(pytest:*)`, `Bash(ruff:*)`, `Bash(pyright:*)`, `Bash(mypy:*)`
- JS/TS: `Bash(<pm> test:*)`, `Bash(<pm> run test:*)`, `Bash(<pm> run lint:*)`,
  `Bash(<pm> run typecheck:*)`, `Bash(<pm> run build:*)`, `Bash(<pm> exec tsc:*)`

Also add to `permissions.deny`: `Read(./.env)`, `Read(./.env.*)`.

## 5. Report
List what you created or changed, the commands you detected, and any `<TODO>`s
left. Then tell me the next steps:

1. Fill the remaining TODOs in CLAUDE.md.
2. Plan the project: `/pong:plan-project <idea>`
   (or step by step: `/pong:grill` → `/pong:prd` → `/pong:spec` → `/pong:tickets`).
3. Build tickets one at a time: `/pong:run-ticket T-001`.
