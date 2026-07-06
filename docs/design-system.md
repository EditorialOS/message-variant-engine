# Design System — Message Variant Engine

> This document is the **single source of truth** for how Message Variant Engine produces on-brand output. It is intentionally written in markdown so it can be versioned, reviewed, and reused the way a design team reviews components. The AI skill in [`../ai-skills/message-adaptation-skill.md`](../ai-skills/message-adaptation-skill.md) consumes these rules directly.

## 1. Brand voice

Voice is the constant; everything else adapts around it.

- **Personality:** clear, confident, human. Never corporate-stiff, never gimmicky.
- **Point of view:** speak *to* the reader, not *at* them. Second person, active voice.
- **What we sound like:** direct, warm, specific.
- **What we never sound like:** hype-y, jargon-heavy, hedging, or filler-padded.

## 2. Tone rules

Tone flexes by context, within guardrails:

- Match the reader's emotional state; never overclaim.
- One idea per sentence; cut qualifiers ("just," "very," "really").
- Prefer concrete nouns and verbs over abstractions.
- Read it aloud — if it sounds like a press release, rewrite it.

## 3. Vocabulary

- **Use:** the product's real names and the audience's own words.
- **Avoid:** internal jargon, acronyms without expansion, banned words configured by the brand owner.
- **Locked terms:** product names, legal language, and claims are verbatim and never paraphrased.

## 4. Type, color & layout principles

Although Message Variant Engine outputs primarily text, its UI and any rendered output follow the same design discipline:

- **Type:** a clear hierarchy — one heading level per level of meaning; generous line length limits for readability.
- **Color:** functional first (state, emphasis), brand second; sufficient contrast (WCAG AA).
- **Layout:** whitespace is a feature; group related fields; one primary action per view.
- **Rhythm:** consistent spacing scale; nothing arbitrary.

## 5. Adaptation rules (what may flex)

Each channel imposes its own shape and etiquette. The skill encodes:

| Channel | Length target | Tone shift | Formatting |
|---|---|---|---|
| Email | 60–120 words | Warm, complete sentences | Greeting + body + sign-off |
| In-app | 1–2 sentences | Direct, present tense | No greeting; action-first |
| Push / SMS | ≤ 140 chars | Urgent but human | Single CTA |
| Sales outreach | 40–80 words | Personal, low-pressure | First-name greeting |

## 6. Guardrails (what must never break)

- Never alter locked sections/terms.
- Never invent facts, claims, prices, or features.
- Never break platform/format hard limits.
- Never drift from the brand voice defined in §1–§3, regardless of audience.

## 7. How this becomes behavior

These rules are not documentation *about* the product — they are the product's **instructions**. The AI skill composes them with user input at runtime, so editing this file changes the output. That is the core idea: **markdown-based brand documentation as executable source of truth.**
