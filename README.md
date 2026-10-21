# Software factory starter

An opinionated software factory starter based on Jake's setup. You direct the product; the agent does the code, setup, research, infrastructure, and improvements to its environment.

Run through **Claude Code or Codex connected to a box the agent controls**. In chat-only Cowork/claude.ai, use this as guidance and hand provisioning to the box session. Connected execution tools can enable host access; the prompt alone cannot.

## Give your agent this

```text
Build my software factory from https://github.com/jaykaycodes/software-factory-starter.
Read README.md and skills/grow-factory/SKILL.md, then operate the setup yourself.
Use the stack/provider defaults. Ask what I want to build and my budget, inspect
what I already have, and guide the provider and coding-agent sign-ins. Use browser
or computer tools for the steps you can; bring me in for passwords, MFA, consent,
and decisions that need me.

Start with broad admin access to my own dedicated factory account and box, with
credentials secured on the box. Get a reachable AWS box, a working signed-in agent,
one passing just doctor/check, and my first project underway. Keep one shared
workflow library across my coding clients. Then build the project, prove it works,
and improve the factory from real friction. Tighten and separate access before
adding teammates, unattended jobs, or production data. Do the work, don't just
give me a plan. Preserve existing working tools; explain worthwhile deviations.
```

**First-hour target:** reachable box, real agent response, passing doctor/check, started project worktree. Signups can take longer; completing the product and improving the factory come next.

Defaults: **Bun + TypeScript + Effect v4**, **just + mise + Vite+ + Fallow**, **AWS**, **Cloudflare**, **PlanetScale Postgres**, **Alchemy**, **GitHub Actions**. Effect's runtime schemas, typed errors, service dependencies, and fast feedback help check agent-written services.

- [Bootstrap](skills/grow-factory/SKILL.md): [setup](skills/factory-stack/references/setup.md), [access](references/access.md), [box/doctor/account examples](examples/bootstrap/README.md).
- [Stack](skills/factory-stack/SKILL.md): profiles, providers, libraries.
- [Work](skills/factory-work/SKILL.md) and [maintenance](skills/factory-maintain/SKILL.md): ship useful software and improve the next run.
- [Shared workflows](skills/grow-factory/references/shared-workflows.md): four skills across Claude Code, Codex, and Cursor.
- [Emerging options](references/emerging.md): candidates to evaluate, not automatic migrations.

Clone the full repository; skills share references. Examples are undeployed reference implementations. `just check` checks structure/syntax without provisioning or launching clients. [MIT license](LICENSE).
