# PRD — Message Variant Engine

## Problem

The moment a message has to reach more than one audience, brand voice starts to fragment. A marketer rewrites it for enterprise, a CS lead softens it for churned users, a regional team localizes it for APAC — and three weeks later the brand sounds like five different companies. The rewrite work is invisible, unowned, and impossible to keep consistent by policy alone.

## Solution

Message Variant Engine encodes your brand voice as a reusable AI skill, then generates persona-, region-, and channel-specific variants from a single master message. Sections you mark as locked (legal language, product names, CTAs, claims) stay verbatim; everything else flexes to the audience. The brand owner defines the system once; anyone on the team produces on-brand variants in seconds.

## Users

Brand & design owners (who define and protect the voice) and non-designers — marketers, customer success, sales, regional teams — who need audience-specific copy without going off-brand.

### Primary personas

1. **The Brand/Design Owner** — defines the voice, rules, and standards. Wants leverage: to encode their judgment once and have it applied everywhere without becoming a bottleneck.
2. **The Non-Designer Producer** — needs on-brand output but lacks design/brand training. Wants speed and confidence that what they ship won't be "off."

## Goals

- **G1 — On-brand by default.** Output should be consistent with the brand system without the user having to know the rules.
- **G2 — Self-serve.** A non-designer completes the task end-to-end without escalating to the design team.
- **G3 — Owned system.** The brand rules live as a readable, versionable reference framework (markdown), not tribal knowledge.
- **G4 — Zero backend.** No accounts, no server, no data collection — trust and auditability by design.

## Requirements

### Functional
- Accept the user's input: Master message, target personas, target regions/locales, target channels, and any locked (verbatim) sections.
- Produce: One on-brand variant per persona × region × channel combination, with locked sections preserved exactly.
- Let the brand owner configure voice/rules that constrain every generation.
- Store settings locally; never require an account.

### Non-functional
- **Privacy:** all data stays on-device except the direct, user-keyed call to Anthropic Claude (bring-your-own API key).
- **Latency:** a full generation completes in a few seconds.
- **Auditability:** the entire behavior is open source and inspectable.
- **Extensibility:** the rule set is modular markdown, editable without touching code.

## Success & adoption metrics

| Metric | Definition | Target signal |
|---|---|---|
| Activation | User completes one real generation | First-session success |
| Self-serve rate | Tasks completed without design-team review | ↑ over time |
| On-brand acceptance | Output shipped with minimal edits | Low edit distance |
| Repeat use | Return within 7 days | Habitual use |
| Rule reuse | Brand config reused across generations | Encoded voice pays off |

## Non-goals

- Not an autonomous agent, and not an evals harness. This is an **AI skill**: a structured, human-directed instruction set that produces reliable, on-brand output.
- Not a content database or CMS.
- Not a replacement for the brand/design owner — a force multiplier for them.
