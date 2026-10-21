# Example: a reading list drives the factory

This is an illustrative sequence, not a completed deployment or verified automation from this kit.

The owner wants a small personal reading list. An item should survive refresh, duplicates should be handled sensibly, and the owner should be able to run it again after restarting the box. The owner authorizes development and a private source repository, with production publication and paid services requiring a separate decision.

The agent inspects the owner's existing setup and uses its familiar stack. It records a short plan, establishes reproducible setup and task commands, and stores credentials through the owner's secret manager. Doctor proves private repository reads under the agent's actual identity. A browser configuration file exists, but a real open-page probe fails. Doctor records a required failure. The agent can implement backend persistence while the browser is being connected; it cannot call the UI verified.

The agent builds the thin slice. Once browser access works, it submits an item, reloads, checks persistence and duplicate handling, and retains proof against the committed revision. Boundary checks cover persistence. A reviewer examines the code and raw proof with fresh context. A later code fix changes the revision, so the affected behavior is proved again and the reviewer checks the correction. Publication stays pending owner authority.

Two real runs reveal the same friction: the service boots on a different port from the browser target, costing a human interruption each time. The agent links those observations and proposes one improvement: the development task reports its actual address in one machine-readable output that the proof task consumes. This is better than adding another instruction to remember the port.

The agent implements it, reproduces the occupied-port scenario, and shows that browser proof reaches the correct service without a manual correction. It records the change, final commit, reviewer result, and before/after evidence. A fresh session finds the local instructions and runs the documented workflow. If that fresh-session check fails, guidance discovery remains unverified until repaired.

At the end, the owner has a useful application, a repeatable build-and-proof loop, and one demonstrated improvement. There is no need for a scheduler or agent swarm yet. A later task might justify remote builds, different models, native device tooling, or scheduled maintenance. The next project supplies that evidence.
