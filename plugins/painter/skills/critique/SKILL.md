---
name: critique
description: Reviews a screen or the whole UI against the design system, reference images and taste rules (hierarchy, typography, color, states, accessibility, banned patterns) using real screenshots, and reports prioritized findings. Use when the user asks to critique, audit or review a UI, or asks why something looks off.
argument-hint: [optional: screen, route or file to critique]
---

Target: $ARGUMENTS (if empty, critique every main screen)

Load the `painter:taste` skill first. This command only reports; it never edits.

## 1. Context
Read `docs/ui/DESIGN.md`, `docs/ui/README.md` (open the reference images),
and the code for the target screens.

## 2. See it
Use the Screenshot command from CLAUDE.md to capture each target screen at
three sizes (web: 375, 768, 1440px; desktop: minimum, typical, maximized).
Save to `docs/ui/_critique/<screen>-<size>.png` and open each one.
Capture empty, loading and error states too when you can trigger them.
If there's no Screenshot command, say so and critique from code only; say
clearly that the findings are less reliable.

## 3. Judge
Go through the taste checklist, then compare against DESIGN.md and the
references at their Kind (`exact`, `mockup`, `inspiration`). Also judge overall:
- Is the hierarchy obvious in two seconds? Is there one clear primary action?
- Does it look like this product, or like a template?
- What's the single change that would improve it most?

## 4. Report
```
## Critique: <target>
Overall: <2–3 sentences>
Biggest win: <one change>

| # | Sev | Where | Problem | Fix |
|---|---|---|---|---|
| 1 | HIGH | src/ui/Settings.tsx:42 (375px) | Save button wraps to two lines | Shorten to "Save"; min-width token |
```
Severity: **HIGH** = broken, inaccessible or clearly off-brand; **MED** =
inconsistent or missing states; **LOW** = polish. Batch related issues into one row.

Next step: `/painter:polish` to fix them.
