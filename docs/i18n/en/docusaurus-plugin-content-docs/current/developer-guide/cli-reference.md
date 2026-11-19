---
sidebar_position: 2
title: CLI Command Reference
description: Complete ReactPress CLI reference — init, doctor, logs, stop, content automation, and Monorepo pnpm script crosswalk.
keywords: [reactpress, cli, commands, init, doctor, logs, content, pnpm]
---

# CLI Command Reference

ReactPress has two command surfaces: the **global CLI** (end users) and **Monorepo pnpm scripts** (contributors).

## Global CLI (`@reactpressjs/reactpress`)

5.0 includes the core site commands and `content` automation below. Legacy commands such as `dev`, `theme`, and `plugin` are removed — use Admin or Monorepo scripts instead.

### `reactpress init [directory]`

Initialize a site and **auto-start** the full stack.

| Option        | Description                                 |
| ------------- | ------------------------------------------- |
| `-f, --force` | Force re-initialization (clears local data) |

```bash
mkdir my-site && cd my-site
reactpress init
```

### `reactpress doctor [directory]`

Diagnose Node version, port usage, database connection, process status.

| Option        | Description                             |
| ------------- | --------------------------------------- |
| `--show-logs` | Attach recent logs when diagnosis fails |

Subcommand `reactpress doctor check` is the default behavior.

### `reactpress logs [directory]`

View structured API logs.

| Option             | Description                    |
| ------------------ | ------------------------------ |
| `-f, --follow`     | Follow continuously            |
| `--tail <n>`       | Show last n lines (default 50) |
| `--source <name>`  | Filter by source               |
| `--grep <pattern>` | Regex filter                   |
| `--list`           | List available log sources     |

Alias: `reactpress doctor logs`.

### `reactpress stop [directory]`

Stop API and theme processes for the current project.

### `reactpress content` (5.0)

The global CLI also supports content automation. Run these commands from an initialized site directory with its API running. Use `reactpress content --help` or a subcommand's `--help` to see all options.

| Command | Required flags | Purpose |
| --- | --- | --- |
| `reactpress content key` | `--create` | Sign in as an administrator and create an API key |
| `reactpress content article create` | `--file <path>` | Create an article from Markdown; defaults to a draft |
| `reactpress content article publish` | `--id <id>` | Publish an existing article |
| `reactpress content media` | `--upload --file <path>` | Upload a media file |

#### Credentials

`content key --create` accepts `--username` and `--password`, or the `REACTPRESS_ADMIN_USER` and `REACTPRESS_ADMIN_PASSWORD` environment variables. Both default to `admin` when omitted; use your current administrator credentials if you changed them. The key name defaults to `agent` and scopes to `read,write`; override them with `--name` and `--scopes`.

`--save` writes `REACTPRESS_API_KEY` and `REACTPRESS_API_URL` to the site's `.env`. The command also prints the new key: keep terminal output and `.env` private. Subsequent article and media commands accept `--api-key`, `REACTPRESS_API_KEY` from the environment or the saved key in `.env`. A `REACTPRESS_TOKEN` environment variable can supply a bearer token instead.

All content commands accept `--api-url` to override the API base URL, including its prefix (for example, `http://127.0.0.1:3002/api`). Otherwise they use `REACTPRESS_API_URL` from the process environment or the site's configured API URL.

#### Create a draft

Save this as `draft.md`. A frontmatter `title` and a nonempty Markdown body are required:

```markdown
---
title: My first draft
---
An article to review before publishing.
```

With administrator credentials available as described above:

```bash
reactpress content key --create --save
reactpress content article create --file draft.md
```

Creating an article does not publish it by default. After reviewing the draft, use `reactpress content article publish --id <id>` with the returned article ID. Alternatively, `article create --publish` publishes at creation time; omit it for a draft-only workflow. Media uploads use `reactpress content media --upload --file <path>`.

### Help and version

```bash
reactpress           # banner + help
reactpress --help
reactpress --version
```

## Monorepo scripts (repository root)

For contributors and deployments needing full lifecycle management:

| Script                    | Description                          |
| ------------------------- | ------------------------------------ |
| `pnpm dev`                | Full-stack dev (API + Admin + Theme) |
| `pnpm dev:api`            | API only                             |
| `pnpm dev:web`            | Admin + API                          |
| `pnpm dev:client`         | Visitor theme only                   |
| `pnpm dev:desktop`        | Electron desktop dev                 |
| `pnpm dev:docs`           | Docusaurus docs site                 |
| `pnpm build`              | Production build                     |
| `pnpm start` / `pnpm pm2` | Production start                     |
| `pnpm build:plugins`      | Compile official plugins             |
| `pnpm build:desktop`      | Package desktop installer            |
| `pnpm status`             | Service status                       |
| `pnpm run init`           | Prepare config only, do not start    |

### Docker-related (optional MySQL)

| Script                 | Description          |
| ---------------------- | -------------------- |
| `pnpm docker:dev`      | Start embedded MySQL |
| `pnpm docker:dev:stop` | Stop Docker database |

## Environment variables

| Variable                      | Description                       | Default                 |
| ----------------------------- | --------------------------------- | ----------------------- |
| `REACTPRESS_LANG`             | CLI / Admin language `en` \| `zh` | `en`                    |
| `DB_TYPE`                     | `sqlite` \| mysql config          | `sqlite`                |
| `SERVER_PORT`                 | API port                          | `3002`                  |
| `CLIENT_SITE_URL`             | Public visitor site URL           | `http://localhost:3001` |
| `ADMIN_USER` / `ADMIN_PASSWD` | First bootstrap admin             | `admin` / `admin`       |

Full list: [Configuration](../tutorial-extras/config-intro.md) and [Glossary](../reference/glossary.md).

## Deprecated commands

These fail in 4.0 global CLI with a hint to use `init`:

`start` · `dev` · `docker` · `nginx` · `server` · `build` · `status` · `publish` · `theme` · `plugin` · `db` · `desktop` · `client`

Monorepo `pnpm dev` etc. still invoke the full implementation via internal CLI entry.

## Related docs

- [Installation & requirements](../getting-started/installation.md)
- [Monorepo local development](./local-development.md)
- [Troubleshooting](../reference/troubleshooting.md)
