---
title: "A security harness that refuses to run anywhere but localhost"
summary: "Functional tests ask whether a feature works. This harness asks who else can reach it, against a local copy of the app, and it cleans up every record it seeds."
role: "Sole QA, design and build"
period: "2026"
stack: ["Node.js", "Playwright", "MongoDB (local, throwaway)"]
order: 3
status: published
---

## The problem

My functional tests check that a feature works for the person using it. They never ask the other questions. Can a request with no login reach data it shouldn't? Can one account read another account's records? Does a forged session get in?

Checks like that need a different kind of tool. It sends requests a real user never would, and some checks have to write data before they can test anything. Pointed at the wrong environment, a tool like that is a risk in its own right.

## What I built

A standalone harness, in its own repo, that runs against a local copy of the app and reaches it only over HTTP. A coordinator runs two groups of probes:

| Group | What it asks |
|---|---|
| Backend | Does a request with no login reach endpoints that should need one? Can a record seeded for one test user be read from a different account? Does each stage of a session behave as it should? Does the login input hold up against operator-injection and type-confusion payloads? |
| Frontend | Do protected API routes reject a missing or forged session cookie? Can one user read or change another user's settings? Do public pages load cleanly, with the expected security headers? |

The injection probe builds payloads from a fixed list plus heuristics, and it can optionally ask an LLM for more candidates. Each group skips itself if its target isn't running, so even a partial local setup still gets a report.

## The safety model

This was the real design work. The probes are simple. Making them impossible to aim at the wrong place is not.

- **Fail-closed host gate.** Every target must be `localhost` or `127.0.0.1`, or the run stops before the first request.
- **No destructive endpoints,** ever.
- **Every write is tagged and cleaned up.** The only records the harness writes are tagged as test seeds. They are removed in a `finally` block, and a residue check confirms nothing is left behind.
- **Local database guard.** If the database isn't on the local machine, every probe that writes is skipped. Before any write, the harness also checks that it can reach the database to clean up afterwards, and refuses to write if it can't.
- **Logs carry no real data.** They hold status codes, the *shape* of a response body (key names, lengths, types) and booleans, never a real value. Connection strings are scrubbed from all output.

## How findings flow

Every probe reports findings in one shared format. The coordinator merges and de-duplicates them, keeping the highest severity and the strongest evidence. It then compares the live results with an earlier static audit, to show which known issues are now confirmed live and which are new. A diff between runs shows what is new, regressed or fixed.

The pure parts, such as the merge-and-dedupe engine, have unit tests that run in CI on every push. The live probes are kept out of CI on purpose: they need running services, and they belong on a developer's machine.

## What I can't show

The findings themselves stay private, because they belong to the product. What I can say about the harness itself: verified runs ended with every seeded record removed and none left behind.
