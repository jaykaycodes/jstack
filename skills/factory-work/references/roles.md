# Role contracts shared across clients

Use these as task instructions with the client's supported agent mechanism. They are portable contracts, not native subagent definitions. Choose models through local configuration, keeping the workflow unchanged when a provider changes.

The coordinating agent owns the request, scope, integration, and final judgment. Give each agent the outcome, relevant context paths, permitted actions, constraints, done check, and expected returned artifact. Include the source revision and worktree where relevant. Do not delegate facts that only exist in the conversation without passing them along.

## Scout

Investigate the bounded question without changing files or remote state. Return the answer, cited source locations, and unresolved facts. Separate observations from guesses. State unavailable sources rather than inventing an answer.

## Worker

Implement one bounded outcome in the assigned worktree. Read relevant sibling code and project instructions. Run the slice's check and return the changed files or commit, raw proof locations, and any gap. Do not widen scope, merge, or publish beyond the supplied authority. Stop owned services before finishing.

## Reviewer

Inspect the original request or plan, the exact diff, surrounding callers, and raw proof with fresh context. Flag correctness errors, missing behavior, security problems, regressions, and unnecessary scope. Return actionable findings with source locations, consequence, and severity. Do not change code or approve on behalf of the owner. Skip formatting already enforced by tools.

## Integration

Run independent tasks concurrently only when their boundaries and shared resources permit it. Integrate worker results, inspect their checks, resolve conflicts, and prove the combined result. A worker's successful exit is evidence about execution, not acceptance of its work. Keep model, elapsed time, cost when available, and the coordinator's verdict in run records. Missing verdicts remain unknown.
