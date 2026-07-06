# Message Variant Engine

![version](https://img.shields.io/badge/version-1.0.0-blue)
![status](https://img.shields.io/badge/status-portfolio--ready-brightgreen)
![type](https://img.shields.io/badge/type-AI%20skill-8A2BE2)
![design tool](https://img.shields.io/badge/design-brand%20system-ff69b4)
![platform](https://img.shields.io/badge/platform-Chrome%20MV3-orange)
![license](https://img.shields.io/badge/license-MIT-lightgrey)

> **One master message, adapted on-brand for every audience — without the voice drifting.**

Message Variant Engine encodes your brand voice as a reusable AI skill, then generates persona-, region-, and channel-specific variants from a single master message. Sections you mark as locked (legal language, product names, CTAs, claims) stay verbatim; everything else flexes to the audience. The brand owner defines the system once; anyone on the team produces on-brand variants in seconds.

**The design/brand problem it solves:** The moment a message has to reach more than one audience, brand voice starts to fragment. A marketer rewrites it for enterprise, a CS lead softens it for churned users, a regional team localizes it for APAC — and three weeks later the brand sounds like five different companies. The rewrite work is invisible, unowned, and impossible to keep consistent by policy alone.

---

## 30-second tour

If you only have half a minute, look here:

- **[`ai-skills/message-adaptation-skill.md`](ai-skills/message-adaptation-skill.md)** — the AI skill itself: a structured, markdown instruction set that turns brand rules into reliably on-brand output. *This is the heart of the project.*
- **[`docs/design-system.md`](docs/design-system.md)** — the brand system as source of truth: voice, tone, type/color/layout and content rules the tool enforces.
- **[`docs/PRD.md`](docs/PRD.md)** — the product thinking: problem, users, goals, and adoption metrics.
- **[`docs/architecture.md`](docs/architecture.md)** — how it works: UI surface, the AI/model layer, and the prompt layer that binds them.
- **[`extension/`](extension/) + demo** — the working Chrome extension (Manifest V3) with a popup UI. *(Demo GIF: see `docs/demo.gif` once added.)*

---

## Who it's for

Brand & design owners (who define and protect the voice) and non-designers — marketers, customer success, sales, regional teams — who need audience-specific copy without going off-brand.

## How it works (in one paragraph)

Message Variant Engine is a Chrome extension (Manifest V3) with a popup UI. The brand owner defines the voice and rules **once** as a markdown reference framework (see [`docs/design-system.md`](docs/design-system.md) and [`ai-skills/message-adaptation-skill.md`](ai-skills/message-adaptation-skill.md)). At runtime, the tool composes those rules with the user's input into a structured prompt and sends it to Anthropic Claude (bring-your-own API key). The result is on-brand output that a non-designer can produce without ever seeing the underlying system.

- **Input:** Master message, target personas, target regions/locales, target channels, and any locked (verbatim) sections.
- **Output:** One on-brand variant per persona × region × channel combination, with locked sections preserved exactly.

## Install & use

1. Clone this repo.
2. In Chrome, open `chrome://extensions`, enable **Developer mode**, and click **Load unpacked**.
3. Select the [`extension/`](extension/) folder.
4. Open the extension, add your Anthropic API key (stored locally, never sent to any server but Anthropic), and go.

> No accounts. No backend. No analytics. See [PRIVACY.md](PRIVACY.md).

## How it stays on-brand

On-brand output is not luck — it's a designed system:

1. **The brand voice is encoded, not remembered.** Tone, vocabulary, and rules live in [`docs/design-system.md`](docs/design-system.md) as the single source of truth.
2. **The AI skill enforces it.** [`ai-skills/message-adaptation-skill.md`](ai-skills/message-adaptation-skill.md) is a structured instruction set with explicit constraints, examples, and guardrails — the same discipline you'd apply to a component library, applied to language.
3. **Adaptation is bounded.** The tool only flexes what should flex (audience, region, channel); everything the brand must protect stays fixed.
4. **Anyone can self-serve.** Non-designers produce on-brand work because the design system is doing the work for them — invisibly.

---

## Why this exists (portfolio note)

This repo is part of a small suite of tools exploring one idea: **the best design systems are increasingly invisible — AI skills, brand-encoded tools, and markdown reference frameworks that let anyone produce on-brand work.** A concrete example of an AI skill built from scratch, where a markdown-encoded brand voice is the source of truth and non-designers self-serve on-brand output.

**Related tools in the suite:**
- [Message Variant Engine](https://github.com/EditorialOS/message-variant-engine) — one message, every audience, on-brand.
- [Brief Engine](https://github.com/EditorialOS/brief-engine) — scattered inputs → structured, on-brand brief.
- [Social Copy Multiplier](https://github.com/EditorialOS/social-copy-multiplier) — one message, platform-perfect everywhere.

## License

MIT — see [LICENSE](LICENSE).
