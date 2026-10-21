# Software factory starter

An opinionated seed based on Jake's software factory: an agent box you control, a shared library of workflows across coding clients, a concrete stack, and a loop that improves the setup through real work.

Use these defaults for a new setup. They are personal recommendations, not claims that every tool is universally best. Preserve a mature existing setup unless a concrete requirement justifies migration. When you deviate, record the reason and carry the choice through setup, tasks, infrastructure, secrets, observability, and docs.

## Start with these defaults

| Default | Use it for | Change when |
| --- | --- | --- |
| [Bun + TypeScript + Effect v4](skills/factory-stack/references/stack.md) | Workspaces, runtime, core application services | An existing system or platform requires another runtime |
| [just + mise + Vite+ + Fallow](skills/factory-stack/references/setup.md) | One task interface, pinned tools, JS/TS checks and audit | Preserve an established equivalent if migrating adds no value |
| [AWS](skills/factory-stack/references/providers.md) | Persistent Linux agent box and main product infrastructure | A simpler edge application fits Cloudflare better |
| [Cloudflare](skills/factory-stack/references/providers.md) | DNS/CDN, quick personal or internal apps, static assets and Workers | Runtime, data locality, or workload needs favor AWS |
| [PlanetScale Postgres](skills/factory-stack/references/providers.md) | Substantial managed PostgreSQL applications | Local Postgres for development; D1 for simple SQLite-shaped edge apps |
| [Alchemy](skills/factory-stack/references/providers.md) | TypeScript infrastructure for AWS, Cloudflare, and PlanetScale | Existing infrastructure tooling is already effective |
| [GitHub + Actions](skills/factory-stack/references/setup.md) | Repositories, review, and initial continuous integration | Add Buildkite when owning workers or heavy custom jobs earns it |
| [One shared workflow source](skills/grow-factory/references/shared-workflows.md) | The same skills and rules in Codex, Cursor, and Claude Code | Client adapters differ; workflow content should stay shared |

Choose the project profile you need: **Astro** for content; **React + Vite** for interactive web; **Bun + Effect + Drizzle + Postgres + Better Auth** for services; **Expo** for mobile; **Python + uv + Modal** for compute. Add durable execution, product AI, or extra infrastructure when the project needs it. [Stack profiles and library choices](skills/factory-stack/references/stack.md) explain the defaults and exceptions. [Provider choices](skills/factory-stack/references/providers.md) and [ordered setup](skills/factory-stack/references/setup.md) make them concrete.

## Give this to your agent

```text
Help me build my own small, self-improving software factory using
https://github.com/jaykaycodes/software-factory-starter.
Read README.md, skills/grow-factory/SKILL.md, and skills/factory-stack/SKILL.md.
Use its stack and provider defaults for new work, not just its high-level
principles. Keep an existing mature setup when migration would add no value;
explain concrete reasons for deviations and improve the defaults when warranted.

Start by understanding what I have, what I want to build, and my budget.
Help me establish the AWS agent box, mise-pinned tools, just task interface,
and shared workflow source for my coding clients. Give the agent the access
needed to build, run, verify, and improve the projects and factory itself.
Do the setup you can; give me exact steps for signup or access that needs me.

Build the smallest useful loop around a real project: clear task, implementation,
independent review when warranted, proof on the actual result, and shipping
within the authority we agree on. Package useful workflows as versioned skills
and tools that future sessions can actually find and use.

Use real work to discover what is missing. Turn repeated friction or my
corrections into demonstrated improvements to the setup. Start maintenance
manually, keep it small, and stop when the project works and the next useful
improvement has been proved. Don't build an elaborate agent organization
before we have a reason for one.
```

## What is here

- [Bootstrap skill](skills/grow-factory/SKILL.md) gets the box and first project working.
- [Stack skill](skills/factory-stack/SKILL.md) supplies concrete tools, profiles, providers, and setup steps.
- [Work skill](skills/factory-work/SKILL.md) handles planning, implementation, proof, and review after bootstrap.
- [Maintenance skill](skills/factory-maintain/SKILL.md) improves skills and tooling from observed friction.
- [Shared client workflows](skills/grow-factory/references/shared-workflows.md) keeps Codex, Cursor, and Claude Code on the same source.
- [Bootstrap guide](skills/grow-factory/references/bootstrap.md) describes the box, access, task interface, guidance, and first project.
- [Work loop](skills/grow-factory/references/work-loop.md) covers planning, implementation, review, proof, and shipping.
- [Maintenance guide](skills/grow-factory/references/maintenance.md) turns observed problems into measured improvements.
- [Baseline](skills/grow-factory/assets/baseline.md) is an adaptable source of operating rules, with a [short repository entrypoint](skills/grow-factory/assets/AGENTS.template.md).
- Examples show an [access inventory](examples/capabilities.json), a [run record](examples/run.json), and a [first project and improvement](examples/first-project.md). All example identities and evidence are fictional.

The shared workflow source contains four skills: bootstrap, stack, project work, and maintenance. The included plugin metadata and thin client adapters package that source for Codex, Cursor, and Claude Code. Follow [shared-workflows.md](skills/grow-factory/references/shared-workflows.md) for the actual client wiring and its limits. Clone the full repository: skills reference resources outside their individual folders. If installing only part of it, bundle those resources and update the paths.

You can always explicitly ask an agent to read the skill file. If you want automatic discovery, adapt installation to your client's current documentation and verify it in a **fresh session**, including which source revision it loaded. Do not assume a copied folder is active.

Keep the source checkout and its commit in your local factory notes. Review upstream changes before adopting them, preserve your adaptations, and test affected workflows. Avoid silently replacing every project's instructions with an upstream update.

This is a reference kit, not a provisioned environment. Its files receive editorial and static checks; no infrastructure, live credentials, example application, or client discovery has been tested by this kit. The receiving agent implements and proves those in your environment.

Original material in this kit is [MIT licensed](LICENSE).
