---
name: spec-ui
description: Extends pong:spec. Adds UI stack defaults, design tokens taken from the reference images, a screen-to-component map and a Screenshot command to the spec. Use when writing a spec for a project with a user interface.
user-invocable: false
---

Read `docs/ui/README.md` and open every image before writing the spec.

## UI stack defaults
Use what's decided; otherwise propose these and ask me to confirm:

| | Python | TypeScript |
|---|---|---|
| Desktop UI | PySide6 | Tauri + React (Electron if already used) |
| Web UI | — | React + Vite + Tailwind |
| Terminal UI | Textual | Ink |
| UI tests | pytest-qt | Playwright (+ Testing Library for components) |

## Add to `docs/spec.md`
In **Commands**, add a Screenshot command that saves an image of a named screen
to a path, so verify and review can compare against `docs/ui/`. For example a
Playwright script for web/Electron/Tauri, `widget.grab().save(path)` for Qt, or
Textual's `app.save_screenshot()`.

Add a **UI** section before "Error handling":

```markdown
## UI
### Design tokens
- Colors: <name: hex>, taken from the references
- Font: <family, sizes>
- Spacing: <grid>
- Radius / shadows: <values>

### Screens
| Screen | Reference | Components | State |
|---|---|---|---|
| <name> | `docs/ui/01-<name>.png` | `<ComponentA>`, `<ComponentB>` | <what it reads/writes> |
```

Rules:
- Pull colors, fonts and spacing out of the references into tokens, so tickets
  don't each guess them. For `inspiration` references, pick tokens that fit the feel.
- Each component has one job, and is reused across screens where they look alike.
- Say where empty, loading and error states live.
