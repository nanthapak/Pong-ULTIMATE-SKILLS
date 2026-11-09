---
name: build-ui
description: Extends pong:ticket-planner and pong:implementer. Makes the planner describe each referenced screen in words and the implementer open the references and use design tokens. Use when planning or implementing a ticket whose ui field is not empty.
user-invocable: false
---

Only applies when the ticket's `ui:` list is not empty.

## When planning (ticket-planner)
1. Open every image in the ticket's `ui:` list, plus `docs/ui/README.md` and
   the spec's UI section.
2. The implementer is a cheaper model, so **describe each screen in words in
   the plan**:
   - layout from top to bottom, left to right
   - every element and its exact text
   - which components and design tokens to use (by name)
   - spacing and alignment
   - empty, loading and error states
3. Keep the image paths in the plan so the implementer can open them too.
4. Add a final task: "Take screenshots of <screens> with the Screenshot command".

## When implementing (implementer)
- Open the reference images named in the plan before starting any UI task.
- Use the spec's design tokens. Never hard-code a color, font size or spacing
  value that has a token. If a token is missing, add it to the token file
  rather than hard-coding.
- Reuse existing components before writing new ones.
- Build the empty, loading and error states the plan lists, not just the happy path.
