---
slug: reactpress-5-0-intelligent
title: ReactPress 5.0 智能版 — Skill 写草稿，人审核后发布
description: >-
  ReactPress 5.0 智能版带来自备 Key 的 AI Assist、只写草稿的 Skill，以及人工审核收件箱 —
  建立在 4.0 的插件、桌面端与 Next.js 主题栈之上。一条 CLI，可自托管。
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
  - 审核收件箱
  - React CMS
  - 自托管发布
  - BYOK
---

<!--truncate-->

![ReactPress: Write with Focus. Publish with Joy.](/img/blog/poster.png)

**ReactPress 5.0**（代号 **Intelligent**）是当前推荐版本。

4.0 已经用一条 CLI 拉起 CMS、后台、Next.js 主题、插件与桌面端。5.0 保留整套能力，并加一条硬规则：**AI 可以写草稿；只有人能发布。**

**相关：** [5.0 指南](/docs/tutorial-extras/reactpress-5-0) · [从 4.x 迁移到 5.0](/docs/tutorial-extras/migration-4-to-5) · [更新日志](/blog/changelog)

---

## 5.0 新增什么

| 部分           | 你得到什么                                                        |
| -------------- | ----------------------------------------------------------------- |
| **AI Assist**  | 官方插件，自备 OpenAI 兼容 API Key（BYOK）。ReactPress 不托管模型 |
| **Skills**     | `write`、`organize`、`polish`、`pre-review` — 只产出草稿与提案    |
| **审核收件箱** | 对照提案、编辑草稿，然后立即发布或定时发布                        |
| **发布门闩**   | Skill 永远不能设为 `publish`。只有 **通过** 才能上线              |
| **包名**       | npm scope 统一为 `@reactpressjs/*`                                |

后台新增 **Agent** 侧栏（流式对话）、编辑器侧栏 Skill 动作，以及带提案 diff 的审核收件箱。

---

## 快速开始

需要 Node.js 20+。

```bash
npm install -g reactpressjs
mkdir my-site && cd my-site
reactpress init
```

| 入口     | 地址                         |
| :------- | :--------------------------- |
| 网站     | http://localhost:3001        |
| 管理后台 | http://localhost:3001/admin/ |
| API      | http://127.0.0.1:3002/api    |

默认账号：`admin` / `admin` — 上线前请修改。

新站点会安装并启用 **AI Assist**。打开 **后台 → 插件 → AI Assist**，粘贴 API Key，点 **测试连接**。

然后：

1. 文章 → **用 AI 创建**，或在编辑器侧栏使用补全 SEO、润色、预审。
2. 打开 **审核收件箱** → 对照 → 通过。
3. 选择 **立即发布** 或 **定时发布**。未通过之前，文章保持草稿。

密钥加密存储。只改其他设置时，Key 留空即可保留当前密钥。

可选 Agent 工作流：

```bash
npx skills add reactpressjs/reactpress --skill blog-ai
```

---

## 为什么这样设计

当 AI 可以把未审内容直接推上线时，「发布税」并没有消失，只是换了形态。ReactPress 5.0 画下硬线：

- Skill 只写 **草稿**
- 人负责 **通过**
- **API Key** 始终是你的

你仍保留 4.0 的自托管数据、可替换 Next.js 主题、插件与桌面端 — AI 是助手，不是自动驾驶。

---

## 从 4.x 升级

完整说明见：[从 4.x 迁移到 5.0](/docs/tutorial-extras/migration-4-to-5)。

```bash
npm uninstall -g reactpress 2>/dev/null || true
npm i -g reactpressjs
cd your-site
reactpress doctor
```

| 场景                   | 动作                                 |
| ---------------------- | ------------------------------------ |
| 新的 `reactpress init` | AI Assist 已启用 — 粘贴 Key 即可     |
| 已有插件的 4.x 站点    | 安装并启用 **AI Assist**，再粘贴密钥 |
| Headless / 主题作者    | 内容 API 无破坏；AI 接口需管理员 JWT |

4.0 能力仍在：[ReactPress 4.0 扩展版](/docs/tutorial-extras/reactpress-4-0)。

---

## 什么没变

- 默认本地 SQLite；成长后再用 Docker / MySQL
- npm 上的 Next.js 主题 — 换肤，内容不动
- Hook 插件与 Headless REST
- 桌面端离线写作

专注写作，愉快发布 — 上线前，先点通过。

---

## 下一步

- [ReactPress 5.0 智能版指南](/docs/tutorial-extras/reactpress-5-0)
- [5 分钟创建第一个站点](/docs/getting-started/first-site)
- [在线演示](https://demo.reactpress.cc/) · [主题演示](https://demo.reactpress.cc/)
- [GitHub](https://github.com/reactpressjs/reactpress) · [English](pathname:///blog/reactpress-5-0-intelligent)
