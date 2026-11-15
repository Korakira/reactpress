---
sidebar_position: 1
title: ReactPress 5.0 Intelligent
description: ReactPress 5.0 Intelligent — BYOK AI Assist, draft-only Skills, and a human Review Inbox. The current recommended release.
keywords: [reactpress 5.0, intelligent, ai assist, review inbox, byok]
---

# ReactPress 5.0 Intelligent

> **Current recommended release.** Skills write and organize drafts. A person approves before anything is published.

5.0 (codename **Intelligent**) keeps the 4.0 plugin, desktop, and theme stack, and adds a first-party **AI Assist** plugin.

| Piece            | What you do                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **API Key**      | Paste your own OpenAI-compatible key in plugin settings. ReactPress does not host a model. |
| **Skills**       | `write`, `organize`, `polish`, `pre-review`                                                |
| **Review Inbox** | Compare the proposal, edit the draft, then publish now or schedule                         |
| **Publish gate** | Skills can only write drafts. Approve is the only action that publishes                    |

Announcement: [ReactPress 5.0 Intelligent](/blog/reactpress-5-0-intelligent).

## Quick start

```bash
npm i -g reactpressjs
mkdir my-site && cd my-site
reactpress init
```

| Surface | URL                          |
| ------- | ---------------------------- |
| Site    | http://localhost:3001        |
| Admin   | http://localhost:3001/admin/ |
| API     | http://127.0.0.1:3002/api    |

Default login: `admin` / `admin` — change before production. Stuck? `reactpress doctor`.

On a new site, **AI Assist** is installed and activated. Open Admin → Plugins → AI Assist, paste the API Key, and use **Test connection**.

Then:

1. Posts → **Create with AI**, or use the editor sidebar (Fill SEO, Polish, Pre-review).
2. **Review Inbox** → Compare → Approve.
3. Choose **Publish now** or **Schedule**. Until you approve, the post stays a draft.

The key is encrypted at rest. Leave the field blank when saving other settings to keep the current key.

Optional Agent workflow:

```bash
npx skills add reactpressjs/reactpress --skill blog-ai
```

## What you see in Admin

| Entry                  | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| Plugins → AI Assist    | Configure / test API Key                           |
| Article editor sidebar | Skill actions: Fill SEO, Polish, Pre-review        |
| Agent right panel      | Streaming chat; apply Markdown into the editor     |
| Review Inbox           | Proposal diff, edit draft, publish now or schedule |

Hard rule: **Skills cannot mark a post as published.** Only **Approve** in Review Inbox publishes.

## Upgrade from 4.x

See [Migrate from 4.x to 5.0](./migration-4-to-5.md). Existing sites that already use plugins need to install and activate **AI Assist** once. Fresh installs do this automatically.

```bash
npm uninstall -g reactpress 2>/dev/null || true
npm i -g reactpressjs
cd your-site
reactpress doctor
```

## 4.0 capabilities remain

Plugins, desktop, and the npm theme catalog: [ReactPress 4.0 Extend](./reactpress-4-0.md).

| Area     | Docs                                                           |
| -------- | -------------------------------------------------------------- |
| Plugins  | [Plugin development](../developer-guide/plugin-development.md) |
| Themes   | [Theme development](../developer-guide/theme-development.md)   |
| Desktop  | [Desktop client](./desktop-client.md)                          |
| Headless | [Headless API](../developer-guide/headless-api.md)             |

## Next steps

- [5-minute first site](../getting-started/first-site.md)
- [Migrate from 4.x to 5.0](./migration-4-to-5.md)
- [Changelog](/blog/changelog)
