---
name: plan-ui
description: Extends pong:grill, pong:prd, pong:spec and pong:tickets. Brings UI reference images, design direction and screens into planning. Use when planning a project or feature that has a user interface.
user-invocable: false
---

Load the `painter:taste` skill. Follow only the section for the step you're in.

## In grill
**Before the first question:** if `docs/ui/` exists, read its README, open
every image, and tell the user in a few lines what you see and what's unclear.
If the idea has a UI but there are no images, ask once whether the user has
any; if yes, ask them to put them in `docs/ui/` (`/painter:setup` creates it).

**Add to "What to cover", after Interfaces:**
- Screens, and which reference each follows at which Kind (`exact`, `mockup` or `inspiration`)
- States the images don't show: empty, loading, error, long text, many items
- What each control does; keyboard use; window/screen sizes; light/dark
- Surface mode (Persuade / Experience / Operate / Read)

**Add to the decision log** a `## UI` table: Screen | Reference | Kind | Notes.

**At the end:** if `docs/ui/DESIGN.md` has no Direction filled in, run the
`painter:direction` steps before suggesting `/pong:prd`.

## In prd
Add before "Edge cases":
```markdown
## Screens
| Screen | Reference | Kind | Stories |
|---|---|---|---|
```
Every screen serves at least one story; every UI story names its screen.

## In spec
- UI stack, if not yet decided:
  | | Python | TypeScript |
  |---|---|---|
  | Desktop | PySide6 | Tauri + React (Electron if already used) |
  | Web | — | React + Vite + Tailwind |
  | Terminal | Textual | Ink |
  | UI tests | pytest-qt | Playwright (+ Testing Library) |
- **Commands:** add a Screenshot command that saves a named screen at a given
  size to a path (Playwright for web/Electron/Tauri, `widget.grab().save()` for
  Qt, `app.save_screenshot()` for Textual).
- Add a **UI** section before "Error handling": the token file path (tokens
  come from `docs/ui/DESIGN.md`, not invented here), and a table
  Screen | Reference | Components | State. Say where empty, loading and error states live.

## In tickets
- Front matter on every ticket: `ui: [docs/ui/<file>]` for UI tickets, `ui: []` otherwise.
- UI tickets get the acceptance check
  `Screenshot of <screen> matches docs/ui/<file> (<Kind>) and passes the taste checklist`.
- The ticket right after the walking skeleton sets up **tokens and base
  components** from DESIGN.md; screen tickets depend on it.
- Each screen ticket includes its empty, loading and error states (or a follow-up ticket does).
- Add a `## Screen coverage` table to `tickets/README.md` (Screen | Reference | Tickets),
  and check every PRD screen is covered before finishing.
