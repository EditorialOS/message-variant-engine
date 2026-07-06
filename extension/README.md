# Message Variant Engine — Editorial OS

> One message. Multiple audiences. Zero inconsistency.

A Chrome extension that adapts one master message for multiple personas, regions, or channels in a single pass — while keeping key facts, and any locked legal/compliance language, identical across every variant.

**Bring your own API key.** The extension calls the Anthropic API directly with a key you provide. The key is stored in local browser storage on your device and is sent nowhere except directly to Anthropic.

## Why

The failure mode of multi-audience communication isn't bad writing — it's drift. Five people adapt the same announcement and five slightly different sets of facts go out. Message Variant Engine holds the master message constant and varies only what should vary: tone, framing, emphasis, and format.

## Features

- **Three adaptation modes** — Persona (Gen Z, Business Exec, Enterprise Buyer…), Region (APAC, LATAM, EU Corporate…), Channel (Internal Comms, External Press, Investor Relations…)
- **Locked sections** — mark legal, pricing, or compliance text and it appears verbatim in every variant
- **Up to 3 variants per run** — each adapted to its target profile with facts held consistent
- **Copy or download** each variant individually
- **No brand assumptions** — the master message you provide is the only source of product or brand context

## Installation

**From the Chrome Web Store:** (link once published)

**Developer mode:**
1. Download or clone this folder
2. Open `chrome://extensions/`
3. Enable Developer mode (top right)
4. Click "Load unpacked" and select this folder

Then open the extension, add your Anthropic API key (from [console.anthropic.com](https://console.anthropic.com)), and generate.

## Privacy

Your API key and inputs are sent directly to the Anthropic API and nowhere else. Nothing is collected by this extension. See [PRIVACY.md](../PRIVACY.md).

---

## Chrome Web Store listing copy

**Name:** Message Variant Engine - Editorial OS

**Short description (≤132 chars):**
Adapt one master message for multiple audiences, regions, or channels — with key facts and locked legal text held identical.

**Detailed description:**

Stop letting your message drift as it spreads.

Message Variant Engine takes one master message and adapts it for up to three target profiles at once — personas, regions, or channels — while holding the facts constant. Mark legal or compliance language as locked and it appears verbatim in every variant.

MODES
• Persona: Gen Z, Business Exec, Remote Professional, Enterprise Buyer, Creative Pro
• Region: APAC, LATAM, EU Corporate, US Press, MENA
• Channel: Internal Comms, External Press, Employee Update, Customer Facing, Investor Relations

HOW IT WORKS
• Paste your master message and pick a campaign type
• Optionally lock sections that must appear word-for-word
• Select up to 3 target profiles and generate
• Copy or download each variant

BRING YOUR OWN KEY
Requires an Anthropic API key (console.anthropic.com). Your key is stored locally on your device and sent only to the Anthropic API — never to us, because there is no "us" server. No accounts, no analytics, no data collection.

Part of Editorial OS: systems for content and communications teams.

**Category:** Productivity
