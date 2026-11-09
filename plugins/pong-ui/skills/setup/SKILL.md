---
name: setup
description: Extends pong:init-project. Creates docs/ui/ with a README index for UI reference images and adds a Screenshot command line to CLAUDE.md. Use when a project has or will have a user interface.
---

Only apply this if the project has, or will have, a user interface (desktop,
web, mobile or terminal). Skip it for libraries, CLIs without a TUI, and APIs.

1. Create `docs/ui/` and copy [templates/UI-README.md](templates/UI-README.md)
   to `docs/ui/README.md` (unless one exists).
2. In CLAUDE.md:
   - Under `## Commands`, add
     `- Screenshot: \`<cmd that saves a screenshot of a screen to a path, or "none">\``
   - Under `## Structure`, add
     `- \`docs/ui/\`  UI reference images + README.md index (read before any UI work)`
3. Tell me to drop screenshots, mockups or inspiration images into `docs/ui/`,
   list them in `docs/ui/README.md` with a Kind, and do it **before** planning.
