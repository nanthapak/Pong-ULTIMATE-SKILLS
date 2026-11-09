---
name: taste
description: Painter's UI and UX quality rules covering direction, typography, color, layout, states, motion, accessibility and banned AI-looking patterns. Use whenever designing, building, critiquing or reviewing any user interface.
user-invocable: false
---

The quality bar for every screen. Project choices in `docs/ui/DESIGN.md` and the
reference images in `docs/ui/` win over these defaults when they conflict.

## 1. Direction before pixels
- Ground the design in the **subject**: who uses it, for what job, in what
  world. Take colors, type and imagery from that world, and use real content
  (never lorem ipsum).
- Know the **surface mode**, because it sets how bold to be:
  | Mode | Examples | Approach |
  |---|---|---|
  | Persuade | landing page, pricing | Bold, distinctive, one strong idea |
  | Experience | onboarding, portfolio, game | Expressive, memorable moments |
  | Operate | dashboard, admin, desktop tool | Restrained, dense, familiar patterns |
  | Read | docs, articles, settings | Calm, typographic, generous whitespace |
- Set the three **dials** (1–5): **variance** (how unusual the layout is),
  **motion** (how much moves), **density** (how much fits on screen).
  Operate/Read usually sit at variance 1–2 and density 3–5.

## 2. Typography
- One or two families, chosen on purpose. Two must be clearly different
  (e.g. a serif display face with a sans body). System fonts are fine for Operate mode.
- Use a type scale (ratio ~1.2–1.333) and stick to it: no more than ~6 sizes.
- Body text: ≥16px on web, line-height 1.4–1.6, line length 45–80 characters.
  Headings get tighter line-height and spacing.
- Weights carry hierarchy: regular for body, medium/semibold for labels and
  headings. Avoid more than three weights.
- Numbers in tables and stats use tabular figures.

## 3. Color
- All colors are **tokens** (CSS variables / theme constants). Never a raw hex in a component.
- Neutrals do most of the work; **one** accent for primary actions and focus.
  Add semantic colors only for success, warning, error and info.
- Contrast: text ≥ 4.5:1, large text and UI parts ≥ 3:1 (WCAG AA).
- Dark mode is designed, not inverted: lower-contrast surfaces, desaturated accents.
- Color never carries meaning alone; pair it with an icon or text.

## 4. Layout and spacing
- A spacing scale on a 4 or 8px grid. Every margin and gap comes from it.
- One clear focal point and one primary action per view.
- Group by proximity; align to a grid; keep consistent edges.
- Check three widths (web: 375, 768, 1440px; desktop: minimum, typical,
  maximized). No horizontal scroll, no clipped text, no overlapping elements.

## 5. Components and states
- Every interactive element has **hover, focus-visible, active and disabled** styles.
- Every data view has **loading, empty and error** states; use skeletons for loading
  layouts and a helpful next step for empty ones.
- Buttons: verb labels ("Save invoice"), text never wraps, one primary per group.
- Click/touch targets ≥ 44×44px on touch, ≥ 32px on desktop.
- Forms: visible labels (not placeholder-only), inline errors next to the
  field, keep the user's input on error.
- Reuse components; similar things must look and behave the same.

## 6. Motion
- Motion explains a change (where something came from or went); it isn't decoration.
- 150–250ms for UI feedback, up to ~400ms for larger transitions. Ease-out to
  enter, ease-in to exit.
- Animate `transform` and `opacity` only. Never animate layout on scroll for no reason.
- Respect `prefers-reduced-motion` (or the OS setting on desktop).

## 7. Accessibility
- Semantic elements first (`button`, `nav`, `label`, headings in order); ARIA
  only when no native element fits.
- Full keyboard use with a logical focus order and a visible focus ring.
- Alt text for meaningful images, empty alt for decorative ones.
- Respect user text size; layouts survive 200% zoom.

## 8. Banned: things that look AI-generated
Don't use these unless the reference images or DESIGN.md explicitly ask for them:
- Purple-to-blue gradients, gradient text, and glow on everything
- Glassmorphism as a default style
- Thick colored side-stripe borders on cards
- The "huge number + small label + gradient accent" hero
- Three equal feature cards as the default layout
- Emoji as icons; mixing icon sets
- Random, heavy or inconsistent shadows; more than two shadow levels
- Everything centered; every section the same height
- Buzzword copy ("Elevate", "Unleash", "Seamless") and em-dash-heavy sentences
- Placeholder text, fake logos, or made-up stats left in the UI

## 9. Desktop apps (PySide6, Tauri, Electron)
- Follow platform conventions: menu bar, standard shortcuts (Ctrl/Cmd+S, Z, F),
  native-feeling dialogs, remember window size and position.
- Design for resize: define the minimum window size and what collapses first.

## Checklist (use for critique and review)
```
- [ ] Matches the direction, mode and dials in DESIGN.md
- [ ] Only token colors, sizes and spacing; no raw values
- [ ] Type scale respected; body ≥16px; line length OK
- [ ] Contrast AA; color not the only signal
- [ ] Hover / focus-visible / active / disabled on every control
- [ ] Loading / empty / error states exist
- [ ] Works at 3 widths/sizes; no overflow or clipping
- [ ] Keyboard-only use works; focus visible and in order
- [ ] Motion purposeful, short, reduced-motion respected
- [ ] None of the banned patterns
- [ ] Real content, no placeholders
```
