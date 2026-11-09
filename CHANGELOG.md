# Changelog

Bump `version` in `plugins/pong/.claude-plugin/plugin.json` with every change,
and add a line here. Newest first.

## 0.2.0 — 2026-11-09
- Added the planning skills: `grill`, `prd`, `spec`, `tickets`, and the
  `plan-project` orchestrator that runs them in order with a pause after each.
- Tickets now have a `stories` field and a `tickets/README.md` index with
  build order and story coverage.
- `init-project` and the CLAUDE.md template point at the new planning flow.
- `run-ticket` keeps the ticket index status in sync.
- The ticket template now lives only in `skills/tickets/templates/`.

## 0.1.0 — 2026-11-09
- First version: `init-project`, `run-ticket`, `verify-app`; `ticket-planner`
  (Opus), `implementer` (Sonnet), `reviewer` (Opus); guard and format hooks.
