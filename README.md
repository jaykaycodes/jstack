# jstack

A starting point for your own agent workshop, based on Jake's setup. Give an agent a persistent computer, useful tools, access to the accounts you choose, and shared guidance. Use it to research ideas, build apps, automate work, and improve the setup as you go.

Run through **Claude Code or Codex connected to a computer the agent controls**. A chat-only session can help you plan; hand the setup to an agent with computer access. The prompt alone does not grant that access.

## Give your agent this

```text
Help me set up my own agent workshop using https://github.com/jaykaycodes/jstack.
Read README.md and skills/grow-factory/SKILL.md. Ask what I want to do and my
budget, inspect what I already have, and use the repo's recommended tools.
Do the research, setup, coding, and infrastructure work yourself. Guide the
account sign-ins; bring me in for passwords, MFA, consent, and decisions.

Start with broad admin access to my own dedicated AWS account and computer
within our agreed budget, with credentials secured there. Get the computer
reachable, the agent signed in and responding, a real setup check passing,
and my first project started. Keep shared guidance across my agent tools.
Then do useful work, check the result, and improve the workshop from experience
and worthwhile new capabilities. Tighten and separate access before adding
teammates, unattended jobs, or production data. Preserve what already works
and explain worthwhile changes. Do the work, don't just give me a plan.
```

**First-hour target:** a computer you can reach, an agent that responds on it, a passing setup check, and your first project underway. Signups can take longer.

You do not need to know the programming tools first. The [technical defaults](skills/factory-stack/SKILL.md) give your agent concrete choices for getting started.

- [Bootstrap](skills/grow-factory/SKILL.md): [setup](skills/factory-stack/references/setup.md), [access](references/access.md), [box/doctor/account examples](examples/bootstrap/README.md).
- [Stack](skills/factory-stack/SKILL.md): profiles, libraries, [CI reliability and Buildkite](skills/factory-stack/references/providers.md#source-delivery-and-offload), and [iOS delivery](references/ios-delivery.md).
- [Work](skills/factory-work/SKILL.md) and [maintenance](skills/factory-maintain/SKILL.md): ship useful software and improve the next run.
- [Shared workflows](skills/grow-factory/references/shared-workflows.md): four skills across Claude Code, Codex, and Cursor.
- [Emerging options](references/emerging.md) and [proposed scouting](references/landscape-scouting.md): discover and evaluate opportunities, not automatic migrations.

Clone the full repository; skills share references. Examples are undeployed reference implementations. `just check` checks structure/syntax without provisioning or launching clients. [MIT license](LICENSE).
