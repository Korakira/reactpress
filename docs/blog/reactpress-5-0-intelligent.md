---
slug: reactpress-5-0-intelligent
title: ReactPress 5.0 Intelligent — Skills draft, humans approve
description: >-
  ReactPress 5.0 Intelligent ships BYOK AI Assist, draft-only Skills, and a human Review Inbox —
  on top of the 4.0 plugin, desktop, and Next.js theme stack. One CLI, self-hosted.
date: 2026-11-13
authors: [reactpressjs]
tags:
  - release
  - reactpress
  - react-cms
  - nextjs
keywords:
  - ReactPress 5.0
  - AI Assist
  - Review Inbox
  - React CMS
  - self-hosted publishing
  - BYOK
---

<!--truncate-->

![ReactPress: Write with Focus. Publish with Joy.](/img/blog/poster.png)

**ReactPress 5.0** (codename **Intelligent**) is the current recommended release.

4.0 already gave you one CLI for CMS, Admin, Next.js themes, plugins, and desktop. 5.0 keeps that stack and adds a first-party rule: **AI can draft; only a person can publish.**

**Related:** [5.0 guide](/docs/tutorial-extras/reactpress-5-0) · [Migrate 4.x → 5.0](/docs/tutorial-extras/migration-4-to-5) · [Changelog](/blog/changelog)

---

## What is new in 5.0

| Piece            | What you get                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| **AI Assist**    | Official plugin with your own OpenAI-compatible API key (BYOK). ReactPress does not host a model. |
| **Skills**       | `write`, `organize`, `polish`, `pre-review` — drafts and proposals only                           |
| **Review Inbox** | Compare the proposal, edit the draft, then publish now or schedule                                |
| **Publish gate** | Skills never set `publish`. **Approve** is the only path to live                                  |
| **Packaging**    | npm scope unified to `@reactpressjs/*`                                                            |

Admin adds an **Agent** side panel (streaming chat), sidebar Skill actions, and a Review Inbox with proposal diff.

---

## Quick start

Requires Node.js 20+.

```bash
npm install -g reactpressjs
mkdir my-site && cd my-site
reactpress init
```

| Surface | URL                          |
| :------ | :--------------------------- |
| Site    | http://localhost:3001        |
| Admin   | http://localhost:3001/admin/ |
| API     | http://127.0.0.1:3002/api    |

Default login: `admin` / `admin` — change before production.

On a fresh site, **AI Assist** is installed and activated. Open **Admin → Plugins → AI Assist**, paste your API key, and use **Test connection**.

Then:

1. Posts → **Create with AI**, or use the editor sidebar (Fill SEO, Polish, Pre-review).
2. Open **Review Inbox** → Compare → Approve.
3. Choose **Publish now** or **Schedule**. Until you approve, the post stays a draft.

The key is encrypted at rest. Leave the field blank when saving other settings to keep the current key.

Optional Agent workflow:

```bash
npx skills add reactpressjs/reactpress --skill blog-ai
```

---

## Why this design

Publishing still costs more than writing when AI can ship unreviewed text into production. ReactPress 5.0 draws a hard line:

- Skills write **drafts**
- Humans **approve**
- Your **API key** stays yours

You keep self-hosted data, swappable Next.js themes, plugins, and the desktop client from 4.0 — with AI as an assistant, not an autopilot.

---

## Upgrade from 4.x

See the full guide: [Migrate from 4.x to 5.0](/docs/tutorial-extras/migration-4-to-5).

```bash
npm uninstall -g reactpress 2>/dev/null || true
npm i -g reactpressjs
cd your-site
reactpress doctor
```

| Scenario                       | Action                                               |
| ------------------------------ | ---------------------------------------------------- |
| New `reactpress init`          | AI Assist already on — paste a key                   |
| Existing 4.x site with plugins | Install and activate **AI Assist**, then paste a key |
| Headless / theme authors       | No breaking content APIs; AI routes need admin JWT   |

4.0 capabilities remain documented: [ReactPress 4.0 Extend](/docs/tutorial-extras/reactpress-4-0).

---

## What did not change

- Local-first SQLite by default; Docker / MySQL when you grow
- Next.js themes on npm — swap look, keep content
- Hook-based plugins and Headless REST
- Desktop client for offline writing

Write with focus. Publish with joy — and approve before anything goes live.

---

## Next steps

- [ReactPress 5.0 Intelligent guide](/docs/tutorial-extras/reactpress-5-0)
- [5-minute first site](/docs/getting-started/first-site)
- [Live Demo](https://demo.reactpress.cc/) · [Theme Demo](https://demo.reactpress.cc/)
- [GitHub](https://github.com/reactpressjs/reactpress) · [中文版](pathname:///zh/blog/reactpress-5-0-intelligent)
