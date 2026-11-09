# Spec: <project name>

Implements: [PRD](prd.md)

## Stack
- Language / runtime: <Python 3.12 | Node 22 + TypeScript>
- Package manager: <uv | pnpm>
- Key libraries: <lib> (for <purpose>)

## Commands
- Dev:        `<cmd>`
- Typecheck:  `<cmd>`
- Lint:       `<cmd>`
- Test:       `<cmd>`
- Build:      `<cmd or "none">`
- Smoke test: `<cmd that proves the app starts and does its core thing>`

## Architecture
<2–3 sentences: the overall shape, e.g. "CLI → parser → domain → renderer".>

```
<entry point>
  └─> <module A> ──> <module B>
                  └─> <module C>
```

## Modules
| Module | Path | Owns | Must not |
|---|---|---|---|
| <name> | `src/<pkg>/<file>` | <its one job> | <e.g. touch the filesystem> |

## Data
<Main types / schemas, file formats, storage. Show the shape, e.g. a typed model.>

## Interfaces
<CLI commands and flags / API endpoints / screens / files read and written.>

## Error handling
- <failure> → <what the user sees, exit code / status>

## Key decisions
- **<decision>:** <choice>. Considered <alternative>; rejected because <reason>.

## Testing
- **Unit:** <what, where>
- **Integration:** <what, where; what's faked>
- **Smoke:** <what the smoke test proves>

## Project layout
```
<tree of the main folders and files>
```

## Open questions
- <anything not decided>
