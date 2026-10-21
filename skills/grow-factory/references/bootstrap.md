# Bootstrap through a real project

## Discover, then choose a thin slice

Inspect existing repositories, instruction files, running services, task commands, available credentials without exposing their values, and current agent capabilities. Ask what the owner wants to build if that is still unknown. Keep their working setup and conventions wherever useful. For a new setup, follow the [stack and provider defaults](../../factory-stack/SKILL.md) and its [ordered setup](../../factory-stack/references/setup.md); do not reopen every tool choice as an abstract survey.

Write a short local plan: first project, observable success, existing assets, missing required capabilities, proposed defaults, authority boundaries, and the next action. Label each capability built and verified, configured but unverified, blocked, or proposed. Do not call a future design installed infrastructure.

The initial project should be small enough to complete and real enough to exercise building and verification. A working service, an actual screen, or a useful script is better evidence than a demo where the agent merely says the tooling is ready.

## A box the agent can actually operate

Default to a persistent AWS EC2 Linux box in the owner's account, with encrypted persistent storage and Systems Manager access. A 4 vCPU, 16 GB machine is a reasonable starting suggestion, sized to budget and workload rather than a purchase mandate. Use ARM when dependencies support it, otherwise x86. The agent needs administrative control over its environment and sufficient network access to install, diagnose, and repair its tools. It also needs scoped access to source control, artifact storage, development services, and the proof surface for the first project. Container or sandbox isolation can still be useful; it should not make the agent depend on a human for every routine repair.

Record how to recreate the environment, reconnect after a restart, recover the working files, and revoke access. Prefer declared tool versions, dependency locks, and repeatable setup commands over undocumented shell history. Keep secrets in a real secret store or use short-lived workload identity. Check the secret can be used without ever emitting it.

On shared machines, assign per-task worktrees and separate ports or service namespaces. Record ownership of processes and cleanup commands. Size the development loop for the machine; offload heavy builds, batch jobs, training, or rendering rather than exhausting shared memory. Budget and permission apply to remote capacity too.

If signup, billing enrollment, hardware access, or an identity grant needs a human, state the exact service or machine, action, purpose, and capability it unlocks. Continue independent local work while waiting. Machine access alone does not settle shipping or spending authority: record explicit defaults for repositories, publication, production, maximum spend, and actions requiring the owner.

## Prove access with a capability doctor

Use an inventory like [capabilities.json](../../../examples/capabilities.json), replacing fictional values with local facts. Select only capabilities required by the chosen project, plus useful optional ones. For each, record the runtime identity, a safe real probe, expected result, and proof location.

Run probes in the actual session or service that will use the capability. An interactive shell's source-control login does not prove a scheduled worker can read the repository. A variable existing does not prove its token is valid. Use harmless reads such as fetching the permitted repository, checking the intended cloud account, or listing a permitted development bucket. Where a write capability is required, use an explicitly authorized disposable resource and clean it up; a read probe cannot prove writes.

Doctor results are `PASS`, `FAIL`, or `WARN`. A missing required capability is `FAIL` and blocks dependent work. An unavailable optional capability is `WARN`. Record what a probe proves and what it does not; doctor passing does not grant authority for unrelated actions. Avoid dumping provider responses that may contain sensitive information.

## One front door for tasks

Use `just` as the discoverable task interface for a new setup, with tools pinned by `mise`. Keep an established equivalent when migration has no concrete benefit. Implement these names where applicable:

| Task | Contract | Typical evidence |
| --- | --- | --- |
| bootstrap | Recreate the supported local environment | Clean setup succeeds |
| doctor | Exercise required capabilities | Identity, probe, result |
| dev | Start a documented local loop | Running service and cleanup |
| check | Run relevant static and automated gates | Failure exits nonzero |
| audit | Inspect unused code, duplication, and complexity | Reviewed findings from Fallow for JS/TS |
| prove | Exercise the actual changed behavior | Artifact, revision, result |
| deploy | Execute the authorized shipping path | Version and destination |

These are contracts to implement where applicable, not commands this kit provisions. Do not add fake success stubs or a release command before a release path exists. A blocked command should exit nonzero and say what is missing. Document unsupported capabilities as gaps.

## Package guidance as a small library

Separate three kinds of context:

- **Always loaded pointers:** a brief client-supported entrypoint that locates the baseline, project guide, authority policy, and active task.
- **Durable knowledge:** architecture, setup, decisions, and reusable workflow skills with their tools and references.
- **Current state:** the active outcome, revision, evidence, uncertainty, and next action. Archive it when complete rather than adding it to universal instructions.

Adopt the [baseline](../assets/baseline.md) once, then use the [entrypoint template](../assets/AGENTS.template.md) as a pointer. Follow [shared-workflows.md](shared-workflows.md) for one owner-controlled workflow repository or plugin source across Codex, Cursor, and Claude Code. Client-specific adapters load the same rules and skills; do not maintain three drifting copies. Put substantial workflows in skills with narrow triggers, clear completion checks, and supporting resources loaded only when needed. Prefer scripts and checks over growing prose when a rule can be enforced mechanically.

Keep the library in version control. Record this reference kit's source URL, source commit, and local adaptations. Use current client docs to install or expose skills if supported. Open a fresh agent session and ask it to identify the relevant workflow, file path, and revision without pasting the whole workflow into the prompt. Inspect what it actually loads. If discovery fails, fix the wiring or use explicit file reads and label automatic discovery unverified.

## Close the first loop

Use [factory-work](../../factory-work/SKILL.md) to complete the real project. Keep a compact [run record](../../../examples/run.json). Then use [factory-maintain](../../factory-maintain/SKILL.md) for one evidenced improvement, or explicitly defer maintenance when no recurring friction or human correction justifies it. [first-project.md](../../../examples/first-project.md) shows how this can work without building a scheduler first.

Finish with what works, proof tied to the final revision, required human steps, and honest gaps. Reconnect or use a fresh session to confirm the setup and guidance survive. Stop there unless the owner has authorized another outcome.
