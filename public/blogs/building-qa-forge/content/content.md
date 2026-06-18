---
publishedDate: 2026-01-05T00:00:00Z
title: Building QA Forge
description: Build notes from QA Forge, the AI-powered testing platform I'm taking from MVP 1 to MVP 2.
tags:
  - QA
  - AI
  - testing
  - automation
---

QA Forge started with a frustration from my day job: I was the only QA on a live product, and most of my week went into writing and re-running test cases that a machine should have drafted for me.

So I started building the tool I wished I had. QA Forge takes a feature description and generates candidate test cases, maps them against existing coverage, and suggests which regression paths actually need a re-run after a change. The goal is not to remove the human from QA — it's to stop the human from doing the boring 80% so the judgment calls get more attention.

MVP 1 is shipped. It does test case generation and a first pass at coverage analysis. The honest assessment: generation is useful immediately, coverage mapping is harder than I expected because real test suites are messy and don't map cleanly to features.

MVP 2 is where the CI/CD integration lives — running the regression suggestions inside the pipeline instead of as a separate step. That's what I'm working on now.

I'll keep posting build logs here as it progresses. If you're doing QA solo somewhere and this sounds useful, [the repo is on GitHub](https://github.com/S-YED/QA-Forge) — I'd genuinely like to hear what your worst repetitive testing task is.
