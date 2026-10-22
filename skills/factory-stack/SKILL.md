---
name: factory-stack
description: Apply the factory's stack and provider defaults when starting a project, adding infrastructure, or revising development tooling.
---

# Factory stack

Use these defaults for new work. Keep a mature working setup unless a concrete requirement justifies migration. Record deviations briefly and carry them through tasks, infrastructure, secrets, observability, and docs.

- Read [stack.md](references/stack.md) for project profiles, Effect boundaries, libraries, and proof tools.
- Read [providers.md](references/providers.md) for AWS, Cloudflare, PlanetScale, Alchemy, CI reliability, Buildkite, and offloaded compute.
- Read [setup.md](references/setup.md) when establishing the box, toolchain, clients, project tasks, and initial CI.
- Read [emerging options](../../references/emerging.md) when evaluating a specific unmet need. These are candidates, not automatic additions.

Core defaults are Bun workspaces and runtime, TypeScript, Effect v4 services, just, mise, Vite+, and Fallow. Use AWS for the agent box and main product, Cloudflare for DNS/CDN and small HTTP/content projects, PlanetScale for substantial managed Postgres, and Alchemy for infrastructure. GitHub Actions is the initial CI default; strongly consider Buildkite for frequent agent-driven builds and reliable delivery, with the availability tradeoffs in the provider guide.

Choose compatible supported releases from official docs, then pin exact versions and dependencies. Read Effect v4 docs and installed source before writing Effect APIs; verify supplementary guidance covers v4. Do not import another repository's compiler patches or wrappers without a demonstrated need.

Done means the selected profile has reproducible setup, real task commands, a working proof surface, and documented runtime boundaries.
