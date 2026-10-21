# A work loop that scales with the task

Use this to establish the local workflow, not as paperwork for every edit. Reuse the project's existing interface, architecture, and owner policy.

## Frame and discover

State the user-visible outcome and how to observe success. Inspect code, area docs, prior runs, connected sources, and the relevant environment before asking the owner for facts already available. For a bug, reproduce it on the failing surface. A failed setup step is evidence to investigate, not permission to silently narrow the outcome.

A small change can go straight from discovery to implementation. For a larger change, keep a short plan with constraints, boundaries, alternatives that matter, and done checks. Choose conventional defaults when reversible; ask for unresolved product decisions or actions outside granted scope. Keep a current next action so another session can continue.

A compact work order can be a few lines: outcome; observable done checks; relevant context paths; constraints and authority; expected proof surface; current next action. Keep it in the task record, not the universal instructions.

## Build and review

Make the smallest coherent change. Reuse sibling patterns, keep module boundaries clear, and hide complexity behind simple interfaces. Migrate callers when changing an interface and delete obsolete paths instead of retaining compatibility shims without a real need. Keep tests that provide useful coverage. Add integration tests for important service or data boundaries and real-data checks for pipelines when they address the risk. Avoid unit tests that merely restate implementation; assertions must reject absent or undefined results.

If parallel work helps, define optional roles such as scout, worker, and reviewer with bounded artifacts and authority. These are workflows, not fixed model choices. Use available tools or agents within the owner's cost and concurrency limits; do not create agents for their own sake. Separate worktrees avoid one worker overwriting another. Parallel tasks need distinct responsibilities, integration ownership, and a stopping condition.

A scout returns relevant facts, evidence, and unknowns without changing the project. A worker implements a bounded outcome and returns the diff plus proof. A reviewer independently looks for behavior gaps and regressions in the exact revision, without treating the author's confidence as evidence.

For substantial work, have a reviewer inspect the changed revision, intended behavior, relevant surrounding code, and raw proof with fresh context. Do not feed it only the author's conclusions. Record findings and the revision reviewed. If independent review is unavailable, mark that gap and apply the owner's policy instead of describing self-review as independent approval.

## Prove the actual result

Define checks that would fail if the behavior were missing. Static checks alone do not establish that a feature works:

- UI: inspect the actual browser or target device, exercise the changed interaction, and retain appropriate screenshots or replay evidence.
- API or database: exercise the boundary in the relevant environment, assert the response and persistent effects, and use realistic permissions and data.
- Data or analysis pipeline: compare representative real or golden inputs and expected outputs, including important failures.
- Factory tooling: run the command or workflow as the identity that will use it. Reconnect or use a fresh session when persistence or guidance discovery is the claim.

Record source commit, any dirty-tree status, target environment, relevant configuration fingerprint without secret values, commands, result, and artifact links. Prefer a committed revision so evidence is reproducible. If a working tree must be used, record its base and retain the exact patch or content hash privately.

Initialize the run outcome as `unknown`. Change it to `passed` only when the relevant checks and review requirements are satisfied, `failed` when they fail, or `blocked` when a dependency prevents completion. A blocked device preview is not a UI pass. After edits, invalidate the checks and review affected by those edits; show why any retained evidence still applies. Never suppress gates or alter expected output just to make the run green.

## Ship and stop

Apply the owner's configured policy for commits, pull requests, merges, publication, and production. Prepare a reviewable artifact before asking for any final approval that policy requires. Full control of a development box does not grant production or public publishing permission.

Report the outcome first, supporting evidence, relevant limitations, and exact human actions. Stop owned services and remote jobs that are no longer needed. Close the task record and leave durable knowledge accurate. Potential improvements go through the maintenance criteria; they do not automatically expand the task.
