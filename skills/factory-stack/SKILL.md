---
name: factory-stack
description: Apply the factory's opinionated stack and provider defaults when starting a project, adding infrastructure, or revising development tooling. Preserve mature existing setups unless a concrete requirement justifies migration.
---

# Factory stack

Use these choices for new work. They are Jake's starting preferences, not universal rankings. A concrete product, platform, compatibility, or operational requirement can justify an exception. Record the reason briefly, then update the task interface, infrastructure, secrets, observability, and docs together.

- Read [stack.md](references/stack.md) for project profiles, Effect boundaries, libraries, and proof tools.
- Read [providers.md](references/providers.md) for AWS, Cloudflare, PlanetScale, Alchemy, and offloaded compute.
- Read [setup.md](references/setup.md) when establishing the box, toolchain, clients, project tasks, and initial CI.

Core defaults are Bun workspaces and runtime, TypeScript, Effect v4 for application services, just for tasks, mise for tool versions, Vite+ for JS/TS tooling, and Fallow for quality audit. AWS is the main product and agent-box provider. Cloudflare is the default for DNS/CDN and a strong fit for small HTTP or content projects. PlanetScale Postgres is the default for substantial managed PostgreSQL needs.

Choose a compatible currently supported release from official docs, then pin its exact version and dependencies. Do not keep a permanent "latest" toolchain or blindly copy unusual compiler patches, custom wrappers, or private repository conventions. Read the Effect v4 docs and installed source before writing Effect APIs; verify that any supplementary guidance actually covers v4.

Finish when the chosen profile has reproducible setup, real task commands and checks, a working proof surface, and documented provider/runtime boundaries. A list of installed dependencies is not an implemented profile.
