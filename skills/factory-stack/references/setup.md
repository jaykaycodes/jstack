# Ordered setup

This is the receiving agent's implementation sequence. It is not an installer shipped or executed by this repository. Read current official documentation for installation, identity setup, and API details, then record exact selected versions and local commands.

## 1. Inventory and scope

Inspect what works already. Establish the owner's first project, accounts, monthly budget, region, repository destination, coding clients, and shipping authority. Use the defaults in [stack.md](stack.md) and [providers.md](providers.md) for gaps. Do not migrate a mature setup merely to match this seed. Record deviations and required human enrollment steps.

## 2. Establish the box and identity

Create or reuse the AWS Linux agent box with persistent encrypted storage, Systems Manager access, appropriate network access, and identity within the agreed budget. Document recreation, reconnect, and recovery. Grant the agent control needed to repair its environment. Set up secrets through the chosen store and service IAM roles rather than committed files or printed values.

Install [mise from its current official instructions](https://mise.jdx.dev/getting-started.html). Create a repository `mise.toml` with exact supported versions of Bun, Node.js, just, GitHub CLI, ripgrep, and jq. Add Python and uv when using that profile, and AWS/cloud tools needed for the selected providers. Verify each tool's current mise backend rather than guessing plugin names. Native dependencies and agent clients also need documented installation.

On the agent box, in the repository containing the reviewed mise configuration:

```sh
mise install
```

For interactive use, follow [mise's shell activation instructions](https://mise.jdx.dev/getting-started.html#activate-mise) for the actual shell. The commands below use `mise exec` from the project root so they do not depend on shell activation. Ensure mise itself is available to that process.

Install the owner's coding clients from current official documentation. Authenticate the interactive client and, separately, any headless worker service. Define the service's working directory, runtime environment, and credential access explicitly. Services should invoke tools through an absolute mise executable path with `exec`, or receive an explicit PATH to the pinned tool installations; shell startup files are not proof that a service receives them.

For a GitHub login check, on the box as the actual agent user:

```sh
mise exec -- gh auth status
```

For an AWS identity check, in the runtime that will make AWS calls:

```sh
mise exec -- aws sts get-caller-identity
```

These are identity checks, not proof of every required capability. Inspect output locally; redact account and identity identifiers in shared evidence, and never print credentials. Run a harmless real operation for each required service as part of doctor. A headless worker must pass its own probes.

## 3. Clone source and wire common workflows

Clone the owner's own projects and the owner-controlled shared workflow repository or plugin. Keep a recorded upstream commit for this starter and local adaptations. Use one baseline and skill source across Codex, Cursor, and Claude Code, with thin adapters appropriate to each client. Do not overwrite existing instructions. Use [shared-workflows.md](../../grow-factory/references/shared-workflows.md) for adapter wiring and fresh-session discovery checks.

Set up per-task worktrees and separate service ports on a shared box. Write down process ownership and cleanup. Keep durable project knowledge separate from active task state.

## 4. Implement the task contracts

Create real `just` recipes for `bootstrap`, `doctor`, `dev`, `check`, `audit`, `prove`, and `deploy` where applicable. Keep substantive automation in scripts or tools behind recipes. A missing required dependency exits nonzero with an actionable failure. Do not create fake passing placeholders.

From the project root on the agent box, inspect the recipes:

```sh
mise exec -- just --list
```

For a new Bun workspace, after reviewing package definitions:

```sh
mise exec -- bun install
```

Commit the resulting lockfile. Continuous integration and reproducible existing-workspace setup use:

```sh
mise exec -- bun install --frozen-lockfile
```

`bootstrap` should install the supported pinned environment and dependencies idempotently. `doctor` should make real capability probes. `dev` should report the actual address and cleanup command. `check` should run the configured formatter/linter, type checker, and relevant automated checks; use the local Vite+ command through `bun vp` in recipes. `audit` should run Fallow for JS/TS and make findings reviewable. `prove` should exercise the actual browser, device, service, or data output. `deploy` should identify the target and follow owner authority, with a verifiable result.

Read current [Vite+ setup and migration docs](https://viteplus.dev/guide/) and [Fallow docs](https://github.com/fallow-rs/fallow) before selecting flags. Do not import another repository's private command wrappers or unusual compiler patches as defaults.

## 5. Build the chosen profile

Scaffold only the first project's profile. For an interactive product, start React + Vite with Bun + Effect services and local PostgreSQL if persistence is needed. For content or a quick internal tool, Astro or a small Workers application may suffice. Use the provider profile for data and deployment, and adapt APIs to the actual runtime. Add authentication, durable work, product AI, analytics, or mobile tooling when needed.

Use local development and a usable preview first. Add staging and production environments when release risk and the product warrant them, with separate secrets, identity, data, and clearly identified targets. Declare infrastructure with Alchemy where supported. Store artifacts in S3 or R2 and expose useful logs, errors, and product signals.

## 6. Close the loop, then maintain

Make GitHub Actions call the same task contracts used locally. Complete the first project through planning, build, review, and proof on the changed artifact. Validate guidance discovery in a fresh client session when that capability is part of the claim; explicit file reads remain a useful fallback.

Record friction and a manual evidenced improvement. Schedule maintenance only after a useful manual run and sufficient recurring need. Stop after the agreed outcome, leaving exact human steps and honest gaps instead of an endless setup project.
