# Changelog

Bump `version` in the changed plugin's `.claude-plugin/plugin.json` with every
change, and add a line here. Newest first.

## painter 0.1.0 — 2026-11-09
- **New `painter` plugin** replaces `pong-ui`. It depends on `pong`, so one
  install covers frontend work: `pong` for any software, `painter` for UI.
- `painter:taste`: our own UI/UX quality rules (direction, mode and dials,
  typography, color, layout, states, motion, accessibility, banned AI-looking
  patterns, desktop conventions, checklist), written from ideas in
  frontend-design, taste-skill, impeccable and web-design-guidelines.
- New commands: `/painter:setup` (now also creates `docs/ui/DESIGN.md`),
  `/painter:direction`, `/painter:critique`, `/painter:polish`.
- Extensions simplified to three: `plan-ui` (grill, prd, spec, tickets),
  `build-ui` (planner, implementer), `check-ui` (verify, review).
- `pong` unchanged.

## pong 0.3.0 + pong-ui 0.1.0 — 2026-11-09
- **pong:** every skill and agent now has an **Extensions** section, so add-on
  plugins can extend a step without changing the core. The reviewer can load
  skills. `run-ticket` passes extension output (e.g. screenshots) to the reviewer.
- **pong-ui (new add-on):** UI reference images in `docs/ui/` used at every step:
  `setup`, `grill-ui`, `prd-ui`, `spec-ui`, `tickets-ui`, `build-ui`, `check-ui`.
- Replaces the short-lived `feature/ui-references` branch.

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
