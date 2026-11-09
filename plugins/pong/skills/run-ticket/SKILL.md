---
name: run-ticket
description: Runs one ticket through plan, implement, verify and review using Opus and Sonnet subagents. Use when the user wants to build a specific ticket.
disable-model-invocation: true
argument-hint: [ticket-id]
---

Ticket: $ARGUMENTS

Copy this checklist and tick it off as you go:

```
- [ ] 1. Plan
- [ ] 2. Implement
- [ ] 3. Verify
- [ ] 4. Review
- [ ] 5. Hand off
```

## 1. Plan
- Find the ticket file `tickets/$ARGUMENTS*.md`. Check every ticket in its `depends_on` has `status: done`. If not, stop and say which are missing.
- Create a branch: `git checkout -b ticket/$ARGUMENTS`. Note the current commit as the base for the reviewer.
- Delegate to the `pong:ticket-planner` subagent with the ticket id.
- If it returns open questions, ask me, then send my answers back to it for a revised plan.
- Show me the plan summary and **WAIT for my OK** before continuing.

## 2. Implement
- Set `status: in-progress` in the ticket file.
- Delegate to the `pong:implementer` subagent with the ticket id.
- STATUS: BLOCKED → show me the reason and stop.

## 3. Verify
- Run the `pong:verify-app` skill, plus every command under "Acceptance checks" in the ticket.
- Any failure → send the full failing output back to `pong:implementer`. Max 2 retries, then stop and report.
- **Only proceed when everything passes.**

## 4. Review
- Delegate to the `pong:reviewer` subagent with the ticket id and base commit.
- HIGH findings → back to `pong:implementer` once, then repeat step 3.
- MED/LOW findings → list them for me. Don't fix them automatically.

## 5. Hand off
- Set `status: review` in the ticket file.
- Summarize: what changed, check results, review findings, anything left open.
- Do not push or open a PR. I do that.
