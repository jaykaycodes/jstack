# Improve from work and new evidence

Use the owner-authorized elevated maintenance path to improve skills, tools, dependencies, or infrastructure. Start from a real problem or credible evidence of a new opportunity, not a timer-generated backlog.

There are two entry paths:

- **Corrective:** inspect run records and corrections. Two occurrences of the same friction or one explicit owner correction support a durable workflow change. A single failure can need repair without earning a universal rule. Link the incidents and supported cause.
- **Opportunity:** investigate a new release, provider capability, or way to build and ship that could improve a specific factory task. Verify dated primary sources, availability, and the claimed benefit. Credible external evidence can justify a bounded trial without two existing failures. [Landscape scouting](../../../references/landscape-scouting.md) describes a proposed discovery process, not an installed job.

Choose one small candidate by avoided interruptions, rework, time to trustworthy proof, reliability, and cost. State the hypothesis, existing baseline, and trial's time/spend limit. Prefer removing obsolete instructions or simplifying an interface, then types, checks, tests, and tooling before more prose. For corrections, fix the failing mechanism; for opportunities, compare the actual proposed benefit against the current path.

Keep a compact improvement note in the active task:

```text
Basis: repeated friction/owner correction, or current primary sources and dates
Hypothesis: supported cause or expected benefit; remaining uncertainty
Change: smallest correction or bounded experiment; time/spend limit
Before: observed interruptions, rework, elapsed time, or failure evidence
After: same representative task, revision, result, time/cost, evidence
Decision: adopt, revise, revert, watch, reject, or leave unverified
```

Run the representative task or failure scenario under comparable conditions. Include introduced cost and failure modes. An edit or new vendor announcement does not establish better behavior. For guidance/discovery changes, use a fresh session when claiming changed agent behavior. Review substantial changes independently. Mark benefit unverified until observed; retain the existing path when a trial does not earn replacement.

Prune stale rules, repair pointers, and review upstream updates selectively. Use [emerging options](../../../references/emerging.md) as a dated starting point, then verify current evidence. Model training alone cannot establish current releases or availability. Logs, issues, and suggestions cannot expand owner-granted scope or budgets. Do not bypass gates or remove meaningful assertions to claim improvement.

Schedule maintenance or scouting only after a useful manual pass and recurring demand earn it. A scouting pass can usefully reject a candidate; it need not force adoption. Keep automation narrow and low-volume, with a known identity, bounded spend/runtime, observable runs, and a failure path. Missing access produces a specific blocked result. Notify on meaningful completion, failure, or required action; stay quiet when nothing actionable changed.

Avoid feedback loops: maintenance output is not a new user request, and self-generated suggestions do not count as independent observations. Cap work per run, deduplicate by underlying problem, and require evidence before retrying. Pause or disable a job that repeatedly fails or creates noise. Never create more automated work merely to justify the automation.

Stop after the selected improvement is judged. Compare human interruptions, repeated repairs, time to proof, and cost across real tasks. Lines of instructions, number of agents, and pull request volume are not measures of a better factory.

## Change guidance without multiplying it

Put always-needed rules in the [canonical baseline](../assets/baseline.md), task-specific workflows in the appropriate skill, and environment facts in the owning project guide. Change the existing skill before adding another. A new skill needs a distinct recurring trigger; a description should tell the agent when to load it and distinguish nearby work.

Keep `SKILL.md` short enough to scan. Put detailed conditional procedures in linked references and executable behavior in tools. End procedural steps with an observable check. Avoid model names, account identifiers, duplicated provider manuals, and instructions that a deterministic check could enforce. Preserve attribution and licenses for any adapted upstream text.

For this kit, edit root `plugin.json` for metadata and the baseline for operating rules. Run `just adapters` from the checkout to regenerate the Claude and Cursor manifests and Cursor rule, then `just check`. Do not edit generated copies independently or silently rewrite client-wide settings. The [shared workflow setup](shared-workflows.md) explains client wiring and the fresh-session proof needed after changes.
