# Software factory starter

A seed for engineers who want an agent to help build its own working environment, then improve it through real software work. Start with a box you control, give the agent the access it needs, and teach it how to turn friction into better tools and guidance.

This is a reference kit, not a ready-made factory. It supplies a bootstrap skill, operating principles, and examples. Your agent should inspect your setup and make its own plan. Keep the parts that help; change the stack, providers, workflows, and instructions when the evidence calls for it.

## Give this to your agent

```text
Help me build my own small, self-improving software factory using
https://github.com/jaykaycodes/software-factory-starter as a reference.
Read README.md, then skills/grow-factory/SKILL.md and follow its bootstrap
workflow. Treat this as a starting point you can improve, not a fixed stack.

Start by understanding what I already have and what I want to build. Help
me get a persistent box I control where you have the access needed to build,
run, verify, and improve both my projects and the factory itself. Do the
setup you can, and tell me the exact steps when signup or access needs me.

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

- [The skill](skills/grow-factory/SKILL.md) routes bootstrap, ordinary work, and maintenance.
- [Bootstrap guide](skills/grow-factory/references/bootstrap.md) describes the box, access, task interface, guidance, and first project.
- [Work loop](skills/grow-factory/references/work-loop.md) covers planning, implementation, review, proof, and shipping.
- [Maintenance guide](skills/grow-factory/references/maintenance.md) turns observed problems into measured improvements.
- [Baseline](skills/grow-factory/assets/baseline.md) is an adaptable source of operating rules, with a [short repository entrypoint](skills/grow-factory/assets/AGENTS.template.md).
- Examples show an [access inventory](examples/capabilities.json), a [run record](examples/run.json), and a [first project and improvement](examples/first-project.md). All example identities and evidence are fictional.

Skills are versioned workflow source, similar to the instructions and resources a plugin can distribute. They are not executable privileges or a claim that your agent client supports this packaging. Clone or read the full repository: the skill references examples outside its folder. If installing just the skill, bundle those resources and update the paths.

You can always explicitly ask an agent to read the skill file. If you want automatic discovery, adapt installation to your client's current documentation and verify it in a **fresh session**, including which source revision it loaded. Do not assume a copied folder is active.

Keep the source checkout and its commit in your local factory notes. Review upstream changes before adopting them, preserve your adaptations, and test affected workflows. Avoid silently replacing every project's instructions with an upstream update.

This is a lightweight reference, with local links, skill metadata, and example syntax checked. No box has been provisioned, cloud access tested, example project executed, or live client skill discovery established. Those are work for the receiving agent in your environment.

Original material in this kit is [MIT licensed](LICENSE).
