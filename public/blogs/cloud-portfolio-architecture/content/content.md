---
publishedDate: 2026-01-19T00:00:00Z
title: Cloud-Hosted Portfolio Architecture
description: How I run this site as a small production AWS exercise — S3, CloudFront, ACM, WAF, Route 53, and the WAF bug that taught me the most.
tags:
  - AWS
  - cloud
  - DevOps
  - portfolio
---

This site could be a free Vercel deploy. I host it on AWS on purpose, because reading about cloud architecture and debugging your own misconfigured WAF late at night are two very different kinds of learning.

The setup: S3 for static hosting, CloudFront as the CDN, ACM for the SSL certificate, WAF in front for security rules, Route 53 for DNS, and billing alarms so a mistake costs me an email instead of a surprise invoice.

The most educational part wasn't the happy path — it was the WAF misconfiguration. I had a rule set that silently blocked legitimate traffic, and the site "worked on my machine" because my IP wasn't matching the rule. Tracing that from symptom (some visitors got 403s) back to cause taught me more about how CloudFront and WAF interact than any tutorial had.

Things I now do differently because of this project:

- Billing alarms go in *first*, before anything else exists in the account.
- Every WAF rule gets tested from a network that isn't mine.
- Infrastructure you can't explain end-to-end is infrastructure you don't actually have.

I keep iterating on it. The next step is proper IaC for the whole stack, so the architecture is reproducible instead of clicked-together.
