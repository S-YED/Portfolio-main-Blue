---
publishedDate: 2026-01-12T00:00:00Z
title: Lessons From Owning QA Solo
description: What being the only QA on a live SaaS product taught me about quality, sign-offs, and saying "not yet".
tags:
  - QA
  - SDET
  - SaaS
  - testing
---

At Parentof Solutions I was the only QA on attentionhero.com, a live SaaS product with real users and a release train that didn't wait for anyone.

Here's what that actually looked like: smoke tests every morning and every evening, 200+ test cases across functional, regression, smoke, and integration suites, run against 10+ browser and device combinations on BrowserStack. Fifty-plus defects tracked across releases v2.0 to v2.4, each with severity, priority, and reproduction steps, because a bug report without repro steps is just a complaint.

The thing nobody tells you about being solo QA: the hard part isn't finding bugs. It's the release sign-off. When you're the only person whose name goes on "this is safe to ship," you learn very quickly which corners can never be cut.

What I'd tell anyone walking into a solo QA role:

- Build repeatable habits before you build clever tests. A boring checklist you actually run beats an elegant suite you don't.
- Write reproduction steps like the developer reading them is tired and annoyed. Because they are.
- Severity and priority are different things. A typo on the pricing page is low severity and high priority. Learn the difference early.
- Your job is to give the team confidence without hiding risk. If everything you sign off is "fine," you're not doing QA. You're doing paperwork.

This experience is also why I'm building QA Forge. A lot of what filled my days was automatable, and I'd rather build that automation than keep doing it by hand.
