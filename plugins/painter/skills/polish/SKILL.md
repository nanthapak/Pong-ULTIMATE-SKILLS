---
name: polish
description: Fixes UI issues by applying the design system and taste rules to existing screens, working from a critique, in batches with before and after screenshots. Use when the user asks to polish, refine, clean up or restyle a UI.
argument-hint: [optional: screen, or "HIGH only"]
disable-model-invocation: true
---

Scope: $ARGUMENTS

Load the `painter:taste` skill first.

1. **Findings.** Use the latest critique in this conversation. If there isn't
   one, run the `painter:critique` steps on the scope first and show me the table.
2. **Agree the batch.** Default: all HIGH and MED findings. Show the list and
   wait for my OK.
3. **Fix in batches**, grouped by component, not one finding at a time:
   - Fix shared components and tokens first, since one change fixes many screens.
   - Use only DESIGN.md tokens. If one is missing, add it to DESIGN.md and the token file.
   - Don't change behaviour or copy meaning without asking.
4. **Check.** Run `pong:verify-app` (tests must still pass), then take new
   screenshots at the same sizes as the critique. Show before → after for each
   fixed finding.
5. **Report.** Fixed, not fixed (and why), and anything new you noticed.
   Commit with a message like `polish: settings spacing, button states`. Never push.
