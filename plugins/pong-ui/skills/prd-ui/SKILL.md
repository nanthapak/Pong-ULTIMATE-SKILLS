---
name: prd-ui
description: Extends pong:prd. Adds a Screens table linking each screen to its reference image in docs/ui/ and the user stories it serves. Use when writing a PRD for a project with a user interface.
user-invocable: false
---

1. Read `docs/ui/README.md` and open the images it lists.
2. Add this section to `docs/prd.md`, just before "Edge cases":

```markdown
## Screens
| Screen | Reference | Follow | Stories |
|---|---|---|---|
| <name> | `docs/ui/01-<name>.png` | exact / mockup / inspiration | US-1, US-2 |
```

3. Every screen must serve at least one user story, and every story with a UI
   must name its screen. Screens with no image still get a row (Reference: "none").
