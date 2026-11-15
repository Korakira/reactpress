---
sidebar_position: 1
title: ReactPress 5.0 智能版
description: ReactPress 5.0 智能版 — 自带 API Key 的 AI Assist、只写草稿的 Skill，以及人工审核收件箱。当前推荐版本。
keywords: [reactpress 5.0, intelligent, ai assist, review inbox, byok]
---

# ReactPress 5.0 智能版

> **当前推荐版本。** Skill 负责写稿和整理，发布前必须由人点通过。

5.0（代号 **Intelligent**）保留 4.0 的插件、桌面端和主题，并加入官方插件 **AI Assist**。

| 部分           | 你要做的事                                                      |
| -------------- | --------------------------------------------------------------- |
| **API Key**    | 在插件设置里粘贴自己的 OpenAI 兼容密钥。ReactPress 不托管模型。 |
| **Skills**     | `write`、`organize`、`polish`、`pre-review`                     |
| **审核收件箱** | 对照提案、编辑草稿，然后立即发布或定时发布                      |
| **发布门闩**   | Skill 只能写草稿。只有通过才会发布                              |

发布说明：[ReactPress 5.0 智能版](/blog/reactpress-5-0-intelligent)。

## 快速开始

```bash
npm i -g reactpressjs
mkdir my-site && cd my-site
reactpress init
```

| 入口     | 地址                         |
| -------- | ---------------------------- |
| 网站     | http://localhost:3001        |
| 管理后台 | http://localhost:3001/admin/ |
| API      | http://127.0.0.1:3002/api    |

默认账号 `admin` / `admin`，上线前请修改。排查：`reactpress doctor`。

新站点会安装并启用 **AI Assist**。打开后台 → 插件 → AI Assist，粘贴 API Key，点 **测试连接**。

然后：

1. 文章 → **用 AI 创建**，或在编辑器侧栏使用补全 SEO、润色、预审。
2. **审核收件箱** → 对照 → 通过。
3. 选择 **立即发布** 或 **定时发布**。未通过之前，文章保持草稿。

密钥加密存储。只改其他设置时，Key 留空即可保留当前密钥。

可选 Agent 工作流：

```bash
npx skills add reactpressjs/reactpress --skill blog-ai
```

## Admin 里你会看到

| 入口             | 作用                                    |
| ---------------- | --------------------------------------- |
| 插件 → AI Assist | 配置 / 测试 API Key                     |
| 文章编辑器侧栏   | Skill 动作：补全 SEO、润色、预审        |
| Agent 右侧面板   | 流式对话；可将 Markdown 应用到编辑器    |
| 审核收件箱       | 提案 diff、编辑草稿、立即发布或定时发布 |

硬规则：**Skill 不能把文章设为已发布。** 只有审核收件箱的「通过」会发布。

## 从 4.x 升级

见 [从 4.x 迁移到 5.0](./migration-4-to-5.md)。已经在用插件的站点需要手动安装并启用 **AI Assist**。全新安装会自动完成这一步。

```bash
npm uninstall -g reactpress 2>/dev/null || true
npm i -g reactpressjs
cd your-site
reactpress doctor
```

## 4.0 能力仍在

插件、桌面端、npm 主题 catalog 的说明见 [ReactPress 4.0 扩展版](./reactpress-4-0.md)。

| 能力     | 文档                                                 |
| -------- | ---------------------------------------------------- |
| 插件     | [插件开发](../developer-guide/plugin-development.md) |
| 主题     | [主题开发](../developer-guide/theme-development.md)  |
| 桌面端   | [桌面客户端](./desktop-client.md)                    |
| Headless | [Headless API](../developer-guide/headless-api.md)   |

## 下一步

- [5 分钟创建第一个站点](../getting-started/first-site.md)
- [从 4.x 迁移到 5.0](./migration-4-to-5.md)
- [更新日志](/blog/changelog)
