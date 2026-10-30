---
title: "A three-tier release gate for a live SaaS app"
summary: "23 Playwright tests against production, split by what one run costs, so the critical checks can run any time and the expensive ones only when asked."
role: "Sole QA, design and build"
period: "2026"
stack: ["Playwright", "GitHub Actions", "TypeScript"]
order: 1
status: draft
---

## The problem

I am the only QA on a live edtech SaaS product. Every release needed the same question answered fast: is production still working? Running every test on every check was not an option. Some tests create real accounts in production each time they run, so running them often has a real cost.

## What I built

A black-box Playwright suite that tests the live app from the outside, the way a user meets it. It contains no application source code. The 23 tests are split into three tiers by what one run costs:

| Tier | Tests | When it runs | Why |
|---|---|---|---|
| `@critical` | 9 | any time | needs no account and no secrets: public pages, the landing page reaching onboarding, mobile layouts, protected routes sending you to login |
| `@daily` | 14 (the 9 critical, plus 5 more) | once a day, on a GitHub Actions schedule | adds the real journeys: signup, passwordless OTP login, the assessment flow, a full first-time journey |
| `@deep` | 9 | only when I ask | one account per age group, a real upload, a booking on a throwaway account: useful, but every run creates accounts |

The 9 critical tests sit inside the daily 14, so the suite is 23 tests, not 32.

## Details that made it work

- **Passwordless login in tests:** the OTP arrives through a disposable-inbox API, so the login journey runs end to end without a human.
- **Reporting:** each scheduled run sends an HTML report by email.
- **The rule behind the split:** most of it is about cost. The exception is anything critical: if a check guards something that must never break, it earns its place in the fast tier by importance.

## Result

All three tiers ran green against production when I validated the suite on 8 July 2026. The cheapest tier runs the most, so the check that matters most is never skipped.
