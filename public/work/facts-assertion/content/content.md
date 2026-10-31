---
title: "A content tool that throws out any draft with a number I didn't give it"
summary: "A local LLM drafts my posts from facts I enter. A mechanical check pulls every number, version, quoted string and identifier out of each draft, and the draft is thrown away if one of them isn't in my facts."
role: "Design and build (personal project)"
period: "2026"
stack: ["Python", "pytest", "Local LLM (LM Studio)"]
order: 2
status: published
---

## The problem

I wanted a tool that drafts my LinkedIn posts from my own notes. The risk with any model writing for you is that it fills gaps with details that sound right: a percentage, a version number, a quote nobody said. A post like that reads well and is false. A style review won't catch it, because nothing about it looks wrong.

## What I built

Post Buddy, a local content system. This write-up covers its generator and the check that runs over everything the generator writes.

**The model never gets a topic.** It gets the facts I entered for one post, a profile of my writing style, and the platform's format. Nothing else. A model asked to write *about* something fills in whatever the subject implies. A model handed a list of facts and asked to arrange them has nothing to fill the gaps from.

**Every draft is scanned for checkable details.** The check pulls these out mechanically, so "is this specific?" is never a judgement call:

| Detail | Examples |
|---|---|
| numbers, with or without a unit | `840ms`, `0.90`, `40k`, `99.9%` |
| code in backticks | `ef_search=40` |
| quoted strings | error messages, quotes |
| dotted or underscored identifiers | `modes.py`, `store._save` |
| acronyms | `OLTP` |

Each one must already exist in my facts. The comparison ignores spacing and case, so `840 ms` matches `840ms`. It keeps units: `840ms` and `840MB` are different claims, and treating them as one would let a unit swap through.

## What happens when a draft fails

- **An invented detail:** the draft is thrown away, never patched. There is no warning, because warnings get ignored. There is no rewrite, because a rewrite can make an invented detail look cleaner without making it true. The model starts over from the same facts. If three drafts in a row each invent something, the run fails: the tool prints `DRAFT REJECTED` with the offending details, and nothing is saved.
- **A style problem,** such as copying a form label into the text: the draft goes back with the faults listed, for up to two rewrites. If a fault survives that, the draft is kept anyway, because it is still true.

The rule behind both: substance can discard a draft, style can only ask for a rewrite.

## How it's tested

The project has 500+ automated tests. The ones that pin this check down:

- A draft with an invented latency figure is retried and then fails, after exactly three model calls.
- A draft that comes back clean on its second attempt is accepted, and the rejected first draft is kept for review.
- A figure typed loosely into a free-text field does not license that figure in the post. Only the fact list does.

## Known limits

- A lowercase product name with no dot in it isn't caught, because no pattern can tell it from an ordinary word. The code records this as an accepted limitation.
- The check proves every detail in a post came from me. It can't prove that what I entered is true. That part is still my job.
