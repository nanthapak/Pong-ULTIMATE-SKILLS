---
name: direction
description: Sets a project's visual direction and design system (mode, dials, aesthetic, color, type, spacing and motion tokens) and writes it to docs/ui/DESIGN.md. Use before building UI, when the user asks for a look, style or design system, or to restyle an existing app.
argument-hint: [optional: what the product is / the vibe you want]
---

Brief: $ARGUMENTS

Load the `painter:taste` skill first; its rules are the floor for everything below.

## 1. Gather
- Read `docs/ui/README.md` and open every reference image; read
  `docs/decisions.md` / `docs/prd.md` if they exist; check existing styles,
  tokens or a theme file in the code.
- If the subject, audience or main job is unclear, ask (one question at a
  time, with a suggested answer).

## 2. Propose three directions
Each one is short:
- **Name** and one-line aesthetic
- **Mode** and **dials** (variance · motion · density)
- **Palette**: 4–6 swatches with hex values
- **Type**: families and why they fit the subject
- **Signature**: the one detail that makes it this product, not a template

Make them genuinely different (e.g. one restrained, one editorial, one bold),
and all grounded in the subject and the references. Mark the one you recommend.
Wait for me to pick, mix or adjust.

## 3. Write `docs/ui/DESIGN.md`
Fill every section of the template (create the file from
`${CLAUDE_SKILL_DIR}/../setup/templates/DESIGN.md` if missing):
- Color tokens for light and dark, checked for AA contrast (text ≥4.5:1).
  Show the contrast ratio for `text`/`bg` and `accent`/`bg`.
- Type scale, spacing scale, radius, shadows and motion tokens.
- The base components the project needs, with their variants.
- Project-specific Do / Don't.

## 4. Make it real (if code exists)
If the project already has a UI codebase, offer to create or update the token
file (CSS variables, Tailwind theme, Qt stylesheet or theme module) to match
DESIGN.md. Don't restyle components unless I ask; that's `/painter:polish`.

## Finish
Show the chosen direction in five lines and the token file path (if any).
Next step: `/pong:plan-project` for a new project, or `/painter:polish` to apply it to existing screens.
