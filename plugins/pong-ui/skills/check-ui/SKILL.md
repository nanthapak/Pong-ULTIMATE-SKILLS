---
name: check-ui
description: Extends pong:run-ticket, pong:verify-app and pong:reviewer. Takes screenshots of the screens a ticket builds and compares them with the reference images in docs/ui/. Use when verifying or reviewing a ticket whose ui field is not empty.
user-invocable: false
---

Only applies when the ticket's `ui:` list is not empty.

## When verifying (run-ticket step 3 / verify-app)
1. Run the Screenshot command from CLAUDE.md for each screen the ticket builds.
   Save to `tickets/<id>.screens/<screen>.png`.
2. Check each file exists and isn't blank, then open it next to its reference.
3. List the differences that matter for the reference's Follow level:
   - `exact`: layout, spacing, colors, fonts, text
   - `mockup`: layout, elements present, text
   - `inspiration`: overall feel only
4. Big differences count as a verify **failure** and go back to the implementer
   with the list. Small ones go to the reviewer.
5. No Screenshot command yet? Say so in the report and skip. Never fake one.

Add to the verify report: `screens: <paths> / skipped (reason)`.

Pass the screenshot paths to the reviewer.

## When reviewing (reviewer)
Add a **UI** check:
- Open each reference and the screenshot you were given; compare at the Follow level.
- Hard-coded colors, sizes or fonts that should use design tokens.
- Missing empty, loading or error states.
- Basic accessibility: labels on inputs, keyboard focus, readable contrast.
- No screenshot provided? Report it as a MED finding.
