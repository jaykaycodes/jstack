# A work loop that scales with the task

The owner directs intent and product decisions; the agent does implementation, proof, and review. Scale the process to the change and reuse the project's existing interfaces.

## Frame and discover

State the user-visible outcome and how to observe success. Inspect code, docs, prior runs, connected sources, and the environment before asking for facts already available. For a bug, reproduce it on the failing surface. Keep the source of important decisions findable so an agent can distinguish owner intent from a suggestion in a log.

A small change can go straight from discovery to implementation. For a larger change, keep a short plan with constraints, boundaries, alternatives that matter, and done checks. Choose conventional defaults when reversible; ask for unresolved product decisions or actions outside granted scope. Keep a current next action so another session can continue.

A compact work order can be a few lines: outcome; observable done checks; relevant context paths; constraints and authority; expected proof surface; current next action. Keep it in the task record, not the universal instructions.

For substantial work, keep the plan in `docs/plans/<slug>.md` unless the project already has a home for plans. Start with what changes for the person, key decisions, and the next action. Give each implementation slice its location, observable completion check, and dependencies. State alternatives only when they could change the decision. Do not build dependent behavior while an unresolved product choice would invalidate it.

## Build and review

Make the smallest coherent change. Reuse sibling patterns, keep module boundaries clear, and hide complexity behind simple interfaces. Migrate callers when changing an interface and delete obsolete paths instead of retaining compatibility shims without a real need. Keep tests that provide useful coverage. Add integration tests for important service or data boundaries and real-data checks for pipelines when they address the risk. Avoid unit tests that merely restate implementation; assertions must reject absent or undefined results.

For a new module, sketch the caller's code before the implementation. Prefer a small interface that hides substantial behavior. When the structure is uncertain, compare two materially different shapes and choose the simpler one to use and change. Ask what complexity returns to callers if the module disappears; remove wrappers that only pass through. Put tests at interfaces callers actually use, with adapters only where behavior must vary. Record the selected boundary and reason with the owning area documentation.

If parallel work helps, define optional roles such as scout, worker, and reviewer with bounded artifacts and authority. These are workflows, not fixed model choices. Use available tools or agents within the owner's cost and concurrency limits; do not create agents for their own sake. Separate worktrees avoid one worker overwriting another. Parallel tasks need distinct responsibilities, integration ownership, and a stopping condition.

A scout returns relevant facts, evidence, and unknowns without changing the project. A worker implements a bounded outcome and returns the diff plus proof. A reviewer independently looks for behavior gaps and regressions in the exact revision, without treating the author's confidence as evidence.

Use the [shared role contracts](../../factory-work/references/roles.md) when dispatching work. The coordinating agent specifies slices and judges their returned evidence. Keep unrelated tasks in separate worktrees, integrate their results, and check the combined revision.

For substantial work, use an independent agent reviewer with fresh context: the request, changed revision, surrounding code, and raw proof. Record findings and the reviewed revision. Resolve material findings before shipping. This supplies engineering review without making the owner read every line; the owner still directs product and shipping decisions under the agreed policy. If independent review is unavailable, record the gap.

## Prove the actual result

Define checks that would fail if the behavior were missing. Static checks alone do not establish that a feature works:

- UI: inspect the actual browser or target device, exercise the changed interaction, and retain appropriate screenshots or replay evidence.
- API or database: exercise the boundary in the relevant environment, assert the response and persistent effects, and use realistic permissions and data.
- Data or analysis pipeline: compare representative real or golden inputs and expected outputs, including important failures.
- Factory tooling: run the command or workflow as the identity that will use it. Reconnect or use a fresh session when persistence or guidance discovery is the claim.

Record source commit, any dirty-tree status, target environment, relevant configuration fingerprint without secret values, commands, result, and artifact links. Prefer a committed revision so evidence is reproducible. If a working tree must be used, record its base and retain the exact patch or content hash privately.

Initialize the run outcome as `unknown`. Change it to `passed` only when the relevant checks and review requirements are satisfied, `failed` when they fail, or `blocked` when a dependency prevents completion. A blocked device preview is not a UI pass. After edits, invalidate the checks and review affected by those edits; show why any retained evidence still applies. Never suppress gates or alter expected output just to make the run green.

## Ship and stop

Apply the owner's existing policy for commits, pull requests, merges, publication, and production. Prepare a reviewable artifact before any final approval that policy requires. Continue owner-authorized work without asking again; new scope follows the agreed policy.

Report the outcome first, supporting evidence, relevant limitations, and exact human actions. Stop owned services and remote jobs that are no longer needed. Close the task record and leave durable knowledge accurate. Potential improvements go through the maintenance criteria; they do not automatically expand the task.

## Keep enough knowledge to resume

For a new project's durable engineering knowledge, start with `docs/index.md` and a small page owning setup and architecture. Add area pages only when the content needs them. Link decisions to their reason and relevant code; update the owning page when a change makes it wrong. Keep credentials, personal information, and raw private conversation content out of shared documentation. Respect an existing knowledge system rather than introducing a competing one.

Before switching client or session, leave a compact handoff in the active task: outcome, repository and worktree, revision, verified progress with evidence paths, unresolved decisions, known traps, and the single next action. Reference existing files instead of copying them. Give the next agent an exact file to read; it must be able to resume without this chat. Archive completed task state separately from enduring operating rules.
