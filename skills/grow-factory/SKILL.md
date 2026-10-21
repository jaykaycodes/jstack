---
name: grow-factory
description: Bootstrap a software factory with a persistent agent box, opinionated stack, shared client workflows, and a proved first project. Use for initial setup or substantial environment expansion.
---

# Grow a software factory

Help the owner build an environment that can build software and improve itself. Start from their goals and existing tools. For new work, use [factory-stack](../factory-stack/SKILL.md) as the default: Bun, TypeScript, Effect v4, just, mise, AWS, Cloudflare where appropriate, and PlanetScale for substantial managed Postgres. Preserve mature existing choices unless a concrete requirement justifies change.

Read [bootstrap.md](references/bootstrap.md), then the stack's [ordered setup](../factory-stack/references/setup.md). Establish the box, real runtime access, common workflow source for the owner's clients, and task interface. Select only the project profile needed for the first useful outcome.

Use [factory-work](../factory-work/SKILL.md) to establish planning, implementation, review, and proof. After bootstrap, the project's entrypoint and task interface should carry ordinary work. For ongoing improvement, use [factory-maintain](../factory-maintain/SKILL.md) rather than repeating bootstrap. Follow [shared-workflows.md](references/shared-workflows.md) for one source across coding clients.

The adaptable [baseline](assets/baseline.md) is the single source for shared operating rules. Read it before proposing adoption. Preserve existing owner rules, resolve conflicts explicitly, and keep repository entrypoints short using [AGENTS.template.md](assets/AGENTS.template.md). Do not overwrite existing instruction files or paste the baseline into every skill.

Produce artifacts the next session can use: reproducible setup, tested capabilities, a task interface, discoverable workflow source, concise project knowledge, and evidence tied to revisions. Distinguish **built and verified**, **configured but unverified**, **blocked**, and **proposed**. A plan or configuration file alone is not a working capability.

Machine administration is permission to operate the granted environment. It does not independently authorize purchases, publication, production changes, or broader access. Keep those boundaries in the owner's local policy and honor existing authorization.

Finish bootstrap when one useful project has passed its done checks, a fresh session can recover the working guidance, and one justified improvement has been proved or explicitly deferred for lack of evidence. Report remaining gaps without turning them into an endless optimization backlog.
