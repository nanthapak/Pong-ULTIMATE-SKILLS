---
name: setup
description: Extends pong:init-project. Creates docs/ui/ with a README for reference images and a DESIGN.md design-system file, and adds a Screenshot command to CLAUDE.md. Use once in any project with a user interface.
---

Only for projects that have, or will have, a user interface. Never overwrite
an existing file without showing me the diff first.

1. Create `docs/ui/` and copy [templates/UI-README.md](templates/UI-README.md)
   to `docs/ui/README.md`.
2. Copy [templates/DESIGN.md](templates/DESIGN.md) to `docs/ui/DESIGN.md`.
3. In CLAUDE.md (create a minimal one if missing):
   - Under `## Commands`, add
     `- Screenshot: \`<cmd that saves a screenshot of a screen at a size to a path, or "none">\``
   - Under `## Structure`, add
     `- \`docs/ui/\`  UI references (README.md), design system (DESIGN.md). Read before any UI work`
4. Tell me the next steps:
   - Drop screenshots, mockups or inspiration images into `docs/ui/` and list
     them in its README with a Kind (`exact`, `mockup` or `inspiration`).
   - Then plan with `/pong:plan-project`, or set the look first with `/painter:direction`.
