---
name: grill-ui
description: Extends pong:grill. Opens the UI reference images in docs/ui/ before questioning and adds UI questions and a UI table to the decision log. Use when grilling an idea that has a user interface.
user-invocable: false
---

## Before the first question
If `docs/ui/` exists:
1. Read `docs/ui/README.md`, then open **every** image it lists (and any other
   images in the folder) with the Read tool.
2. Tell the user in a few lines what you see: the screens, main elements, and
   anything unclear or missing.
3. Use what you saw to answer questions yourself and to ask sharper ones.

If the idea has a UI but `docs/ui/` is empty or missing, ask once whether the
user has screenshots, mockups or inspiration images. If yes, ask them to put
them in `docs/ui/` (run `/pong-ui:setup` if the folder doesn't exist) and wait.
If not, carry on.

## Add to "What to cover", after Interfaces
**UI:**
- Which screens exist, and which reference image each follows
- How closely to follow each: `exact` (layout, spacing, colors), `mockup`
  (layout and content), or `inspiration` (overall feel)
- States the images don't show: empty, loading, error, very long text, many items
- What each button, link and input does
- Window/screen size and resizing, light/dark theme, keyboard use
- UI framework, if not yet decided (defaults are in `pong-ui:spec-ui`)

## Add to the decision log
```markdown
## UI
| Screen | Reference | Follow | Notes |
|---|---|---|---|
| Main window | `docs/ui/01-main-window.png` | mockup | empty state: "Drop a CSV here" |
```
If a decision changes a screen's name, Kind or the style, update `docs/ui/README.md` too.
