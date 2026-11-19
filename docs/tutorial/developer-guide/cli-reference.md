---
sidebar_position: 2
title: CLI 命令参考
description: ReactPress CLI 完整命令参考 — init、doctor、logs、stop、content 内容自动化及 Monorepo pnpm 脚本对照表。
keywords: [reactpress, cli, commands, init, doctor, logs, content, pnpm]
---

# CLI 命令参考

ReactPress 有两套命令界面：**全局 CLI**（终端用户）与 **Monorepo pnpm 脚本**（贡献者）。

## 全局 CLI（@reactpressjs/reactpress）

5.0 包含以下站点核心命令与 `content` 内容自动化命令。`dev`、`theme`、`plugin` 等旧命令已移除，请使用 Admin 或 Monorepo 脚本。

### `reactpress init [directory]`

初始化站点并**自动启动**全栈服务。

| 选项          | 说明                           |
| ------------- | ------------------------------ |
| `-f, --force` | 强制重新初始化（清除本地数据） |

```bash
mkdir my-site && cd my-site
reactpress init
```

### `reactpress doctor [directory]`

诊断 Node 版本、端口占用、数据库连接、进程状态。

| 选项          | 说明                   |
| ------------- | ---------------------- |
| `--show-logs` | 诊断失败时附加最近日志 |

子命令 `reactpress doctor check` 为默认行为。

### `reactpress logs [directory]`

查看 API 结构化日志。

| 选项               | 说明                     |
| ------------------ | ------------------------ |
| `-f, --follow`     | 持续跟踪                 |
| `--tail <n>`       | 显示最近 n 行（默认 50） |
| `--source <name>`  | 按来源过滤               |
| `--grep <pattern>` | 正则过滤                 |
| `--list`           | 列出可用日志源           |

别名：`reactpress doctor logs`。

### `reactpress stop [directory]`

停止当前项目的 API 与主题进程。

### `reactpress content`（5.0）

全局 CLI 也支持内容自动化。请在已初始化的站点目录中运行以下命令，并确保 API 正在运行。使用 `reactpress content --help` 或子命令的 `--help` 查看全部选项。

| 命令 | 必填选项 | 用途 |
| --- | --- | --- |
| `reactpress content key` | `--create` | 以管理员身份登录并创建 API Key |
| `reactpress content article create` | `--file <path>` | 从 Markdown 创建文章，默认为草稿 |
| `reactpress content article publish` | `--id <id>` | 发布已有文章 |
| `reactpress content media` | `--upload --file <path>` | 上传媒体文件 |

#### 凭据

`content key --create` 支持 `--username`、`--password`，或环境变量 `REACTPRESS_ADMIN_USER`、`REACTPRESS_ADMIN_PASSWORD`。未指定时两者均默认为 `admin`；若已修改管理员凭据，请使用当前值。密钥名称默认为 `agent`，权限范围默认为 `read,write`，可通过 `--name` 和 `--scopes` 修改。

`--save` 会将 `REACTPRESS_API_KEY` 和 `REACTPRESS_API_URL` 写入站点的 `.env`。命令也会打印新密钥，请勿公开终端输出或 `.env`。后续文章与媒体命令支持 `--api-key`、环境变量 `REACTPRESS_API_KEY`，或 `.env` 中保存的密钥；也可通过环境变量 `REACTPRESS_TOKEN` 提供 bearer token。

所有内容命令均支持用 `--api-url` 覆盖 API 基础地址，地址需包含前缀，例如 `http://127.0.0.1:3002/api`。未指定时，使用进程环境中的 `REACTPRESS_API_URL` 或站点配置的 API 地址。

#### 创建草稿

将以下内容保存为 `draft.md`。Markdown 必须包含 frontmatter `title` 和非空正文：

```markdown
---
title: My first draft
---
An article to review before publishing.
```

按上述方式提供管理员凭据后运行：

```bash
reactpress content key --create --save
reactpress content article create --file draft.md
```

创建文章默认不会发布。审核草稿后，使用返回的文章 ID 执行 `reactpress content article publish --id <id>`。也可在创建时添加 `article create --publish` 直接发布；仅创建草稿时请勿添加该选项。媒体上传使用 `reactpress content media --upload --file <path>`。

### 帮助与版本

```bash
reactpress           # 显示 banner + 帮助
reactpress --help
reactpress --version
```

## Monorepo 脚本（仓库根目录）

贡献者与需要完整生命周期管理的部署场景：

| 脚本                      | 说明                            |
| ------------------------- | ------------------------------- |
| `pnpm dev`                | 全栈开发（API + Admin + Theme） |
| `pnpm dev:api`            | 仅 API                          |
| `pnpm dev:web`            | 仅 Admin + API                  |
| `pnpm dev:client`         | 仅访客主题                      |
| `pnpm dev:desktop`        | Electron 桌面开发               |
| `pnpm dev:docs`           | 文档站 Docusaurus               |
| `pnpm build`              | 生产构建                        |
| `pnpm start` / `pnpm pm2` | 生产启动                        |
| `pnpm build:plugins`      | 编译官方插件                    |
| `pnpm build:desktop`      | 打包桌面安装程序                |
| `pnpm status`             | 服务状态                        |
| `pnpm run init`           | 仅准备配置，不启动              |

### Docker 相关（可选 MySQL）

| 脚本                   | 说明               |
| ---------------------- | ------------------ |
| `pnpm docker:dev`      | 启动嵌入式 MySQL   |
| `pnpm docker:dev:stop` | 停止 Docker 数据库 |

## 环境变量

| 变量                          | 说明                          | 默认                    |
| ----------------------------- | ----------------------------- | ----------------------- |
| `REACTPRESS_LANG`             | CLI / Admin 语言 `en` \| `zh` | `en`                    |
| `DB_TYPE`                     | `sqlite` \| mysql 配置        | `sqlite`                |
| `SERVER_PORT`                 | API 端口                      | `3002`                  |
| `CLIENT_SITE_URL`             | 访客站公网 URL                | `http://localhost:3001` |
| `ADMIN_USER` / `ADMIN_PASSWD` | 首次 bootstrap 管理员         | `admin` / `admin`       |

完整列表见 [项目配置项](../tutorial-extras/config-intro.md) 与 [术语表](../reference/glossary.md)。

## 已废弃命令

以下命令在 4.0 全局 CLI 中会报错并提示使用 `init`：

`start` · `dev` · `docker` · `nginx` · `server` · `build` · `status` · `publish` · `theme` · `plugin` · `db` · `desktop` · `client`

Monorepo 内 `pnpm dev` 等仍通过内部 CLI 入口调用完整实现。

## 相关文档

- [安装与环境要求](../getting-started/installation.md)
- [Monorepo 本地开发](./local-development.md)
- [故障排查](../reference/troubleshooting.md)
