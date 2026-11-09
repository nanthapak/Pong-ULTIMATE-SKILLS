---
name: check-ui
description: Extends pong:run-ticket, pong:verify-app and pong:reviewer. Screenshots the screens a ticket builds and checks them against the reference images, DESIGN.md and the taste checklist. Use when verifying or reviewing a ticket whose ui field is not empty.
user-invocable: false
---

Only when the ticket's `ui:` list is not empty. Load the `painter:taste` skill.

## When verifying (run-ticket step 3 / verify-app)
1. Run the Screenshot command for each screen the ticket builds, at three sizes.
   Save to `tickets/<id>.screens/<screen>-<size>.png`.
2. Check each file exists and isn't blank, then open it next to its reference.
3. Compare at the reference's Kind (`exact`: layout, spacing, color, type, text;
   `mockup`: layout, elements, text; `inspiration`: overall feel), and run the taste checklist.
4. Broken layout, overflow, missing states or failed contrast count as a verify
   **failure** and go back to the implementer. Smaller issues go to the reviewer.
5. No Screenshot command? Report `screens: skipped (no command)`. Never fake one.

Add to the verify report: `screens: <paths> / skipped (reason)`, and pass the
paths to the reviewer.

## When reviewing (reviewer)
Add a **UI** check to the review:
- Screenshots vs references at their Kind, and vs DESIGN.md direction.
- The taste checklist, including the banned patterns.
- Raw colors, sizes or spacing in components instead of tokens.
- Keyboard use, focus visibility, labels and contrast.
- No screenshots provided: a MED finding.
