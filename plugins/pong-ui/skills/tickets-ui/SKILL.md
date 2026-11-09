---
name: tickets-ui
description: Extends pong:tickets. Adds a ui field listing reference images to UI tickets, adds screenshot checks, and checks every screen is covered. Use when slicing tickets for a project with a user interface.
user-invocable: false
---

## Each UI ticket gets
- In the front matter, after `stories`: `ui: [docs/ui/02-settings.png]`, the
  reference images it builds. Non-UI tickets get `ui: []`.
- An extra acceptance check:
  `- Screenshot of <screen> matches \`docs/ui/<file>\` (<exact | mockup | inspiration>)`

## Slicing
- Set up the **design tokens and base components in an early ticket** (right
  after the walking skeleton), before any screen uses them.
- A screen can be split across tickets (layout first, then each interaction),
  but each ticket should leave the screen in a working, viewable state.
- Include the empty, loading and error states from the spec, in the ticket that
  builds the screen or a follow-up ticket.

## Add to the index (`tickets/README.md`)
```markdown
## Screen coverage
| Screen | Reference | Tickets |
|---|---|---|
| Settings | `docs/ui/02-settings.png` | T-005, T-007 |
```

## Add to the checks before finishing
- [ ] Every screen in the PRD Screens table is built by at least one ticket with it in `ui`
- [ ] Design tokens are set up before any ticket that builds a screen
