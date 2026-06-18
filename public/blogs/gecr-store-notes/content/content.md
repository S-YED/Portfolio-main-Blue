---
publishedDate: 2026-02-09T00:00:00Z
title: GECR Store Project Notes
description: Building an inventory system for my college and watching a paper ledger workflow disappear.
tags:
  - React
  - MySQL
  - full-stack
  - college
---

My college tracked inventory in a physical ledger. Finding out whether an item was available meant finding the person who had the book, and then the book.

GECR Store was my attempt to fix that for Government Engineering College Ramanagara: a web inventory system with a React frontend, MySQL underneath, authentication, and an admin dashboard for the staff who actually manage the items.

The technical part was honestly the easy half. React talking to MySQL through a small API is a well-worn path. The hard half was everything around it:

- Designing the schema around how the staff *actually* categorized items, not how I assumed they did. My first schema was wrong because I never asked.
- Making the admin dashboard simple enough that someone who had used a paper ledger for years could trust it on day one.
- Authentication that was secure but didn't lock people out of their own workflow.

The result: item lookups that used to take minutes of physically checking the ledger became instant, and overall management time dropped by roughly 70%.

The lesson that stuck with me: the best feedback for a developer isn't praise. It's silence. The system quietly became the way things are done, and nobody talks about it anymore. That's what a successful internal tool sounds like.
