# Bootstrap mechanics

The execution sequence lives in [ordered setup](../../factory-stack/references/setup.md). Use the [access guide](../../../references/access.md) for sign-ins and broad bootstrap authority, and the [reference implementation](../../../examples/bootstrap/README.md) for the box, pinned tools, doctor, and later account separation.

## Doctor real capabilities

Select capabilities required by the first project. Record runtime identity, harmless real probe, expected result, and evidence. The [inventory example](../../../examples/capabilities.json) shows the shape; the [bootstrap doctor](../../../examples/bootstrap/README.md) implements a starting set.

Run probes as the session or service that will actually use them. A shell login does not prove a headless worker has access. Credential files and authentication-status commands show local configuration; a real provider operation proves the tested capability. A real response from the chosen coding agent proves it can reach its model. Where writes matter, use a disposable authorized resource and clean it up; reads do not prove writes.

Doctor reports `PASS`, `FAIL`, or `WARN`. A missing required capability is `FAIL` and blocks dependent work; an unavailable optional capability is `WARN`. Bound probe time, avoid dumping sensitive responses, and state each probe's limits. Do not add passing placeholder recipes.

## One task interface

Implement real `just` contracts as they become relevant: `bootstrap` recreates the environment; `doctor` checks capabilities; `dev` starts the local loop and reports its address; `check` runs static and automated gates; `audit` reviews Fallow findings; `prove` exercises changed behavior; `deploy` ships to an identified target under owner authority. Scripts hold substantive behavior behind recipes. Missing required setup exits nonzero with an actionable message.

## Context that survives a session

Keep three layers: short always-loaded project pointers; durable setup/architecture/workflow knowledge; and the current task's outcome, revision, evidence, uncertainty, and next action. Use the [entrypoint template](../assets/AGENTS.template.md) and one [baseline](../assets/baseline.md). Archive finished task state rather than promoting it to universal rules.

Maintain one versioned workflow source across clients using [shared-workflows.md](shared-workflows.md). Record upstream revision and local adaptations; review updates rather than replacing every project's rules blindly. Verify discovery in a fresh session when claiming it works. Explicit file reads are the fallback.

## After the first working hour

Use [factory-work](../../factory-work/SKILL.md) to complete the project, with a compact [run record](../../../examples/run.json). Use [factory-maintain](../../factory-maintain/SKILL.md) for an observed improvement, then consider scheduling only when repeated demand earns it. The [reading-list example](../../../examples/first-project.md) illustrates a completed project and one improvement; neither is a prerequisite for starting work.
