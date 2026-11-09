# Design system

Filled in by `/painter:direction`. Every UI decision follows this file.
The rules in painter's `taste` skill apply wherever this file is silent.

## Direction
- Subject and audience: <who uses it, for what job>
- Surface mode: <Persuade | Experience | Operate | Read>
- Aesthetic: <one line, e.g. "calm editorial, paper-like, serif headings">
- Dials: variance <1–5> · motion <1–5> · density <1–5>
- References: <which docs/ui images set the tone>

## Tokens
### Color
| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | | | page background |
| `surface` | | | cards, panels |
| `text` | | | body text |
| `text-muted` | | | secondary text |
| `border` | | | dividers, inputs |
| `accent` | | | primary actions, focus ring |
| `danger` / `success` / `warning` | | | status only |

### Type
- Families: <display>, <body>, <mono>
- Scale (px): <e.g. 12 · 14 · 16 · 20 · 24 · 32>
- Line-height: body <1.5>, headings <1.2>
- Weights: <400 · 500 · 600>

### Space, shape, depth
- Spacing scale (px): <4 · 8 · 12 · 16 · 24 · 32 · 48>
- Radius: <sm 4 · md 8 · lg 12>
- Shadows: <none | sm | md>, max two levels

### Motion
- Durations: fast <150ms>, base <200ms>, slow <300ms>
- Easing: enter <ease-out>, exit <ease-in>
- Reduced motion: <what turns off>

## Components
| Component | Variants | Notes |
|---|---|---|
| Button | primary, secondary, ghost, danger | one primary per group |

## Do / Don't
- Do: <project-specific>
- Don't: <project-specific, beyond taste's banned list>
