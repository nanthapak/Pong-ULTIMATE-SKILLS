---
name: build-ui
description: Extends pong:ticket-planner and pong:implementer. The planner describes each referenced screen in words; the implementer follows the design system and taste rules. Use when planning or implementing a ticket whose ui field is not empty.
user-invocable: false
---

Only when the ticket's `ui:` list is not empty. Load the `painter:taste` skill.

## When planning (ticket-planner)
1. Open every image in `ui:`, plus `docs/ui/README.md` and `docs/ui/DESIGN.md`.
2. The implementer is a cheaper model, so **describe each screen in words**:
   - layout top to bottom, left to right, and how it changes at each size
   - every element, its exact text, component and variant
   - the tokens to use, by name (color, type size, spacing)
   - hover, focus, disabled, empty, loading and error states
   - any motion (what moves, duration token, reduced-motion behaviour)
3. Keep the image paths in the plan.
4. End with a task: "Screenshot <screens> at 3 sizes and self-check against the taste checklist".

## When implementing (implementer)
- Open the referenced images before starting any UI task.
- Use DESIGN.md tokens only. If one is missing, add it to the token file and
  DESIGN.md. Never write a raw color, font size or spacing value in a component.
- Reuse existing components before writing new ones.
- Build every state the plan lists, not just the happy path.
- Before reporting DONE, run the taste checklist on your screenshots and fix what fails.
