# Proposed landscape scouting

**Status: proposed pattern. This process is not running in the author's factory. This kit has not installed or scheduled it.** It fits under the existing maintenance skill and reuses the scout role; it does not introduce a fifth skill or a new agent service.

An agent's trained architectural judgment is useful, but it cannot supply release information that appeared after training. Give the coordinating agent fresh context about tools, providers, libraries, and ways of building and shipping software. Use that context to challenge defaults intelligently. Recent does not automatically mean better, and familiar does not automatically mean current.

## Start with one bounded brief

The orchestrator is the coordinating agent that owns the factory's priorities and judges proposed changes. It frames a manual research assignment around the current setup and goals: what capabilities to investigate, the date range, relevant sources, and a time or cost budget. A question might concern a newly possible capability, not a failure in today's setup. Opportunity research does not require two prior incidents; permanent corrective rules still need observations or an explicit human correction.

Scouts look for relevant releases and approaches in official changelogs, repository releases, engineering posts, research, and discussion on X. Use an authenticated reader, API, or connector for X when available. Do not assume everyone has a particular command installed. If access is unavailable, report that source gap and continue with accessible official sources.

Treat discussion as leads. Check decisive claims against primary documentation, release artifacts, and availability information. Separate publication date, release date, and the date checked. Distinguish announced, preview, available, and actually adopted in this factory. Note runtime support, account or plan restrictions, migration costs, and important limitations. Several reposts of one announcement are one source, not independent corroboration.

Return a small synthesis to the orchestrator rather than a raw feed. A useful brief can be this short:

```text
Change: capability, release/version, canonical primary-source URL
Dates and status: announced/released, checked, availability and limits
Relevance: current default or new goal it could improve
Evidence: vendor/research claims versus independently or locally measured results
Tradeoffs: compatibility, migration, operating cost, recovery, unknowns
Suggestion: evaluate, adopt, watch, or reject; reason and smallest useful next step
```

## Judge, compare, and update

The orchestrator chooses **evaluate**, **adopt**, **watch**, or **reject**. Explain the reason. An announcement normally supports evaluation or watching; adoption requires evidence appropriate to the change. For a watch item, record a concrete reconsideration trigger, such as a supported runtime release, public availability, or a relevant project need.

Evaluate with one bounded representative task against the working baseline. Compare time to trustworthy proof, human interruptions, rework, total cost, compatibility, and failure recovery. Keep the existing path available. Apply the owner's established authority and budget; research cannot authorize a purchase, migration, publication, or wider access.

After judging the result, update the owning documentation, setup, or canonical skill when adoption is justified. Record why the decision changed, what was measured, and remaining uncertainty. Otherwise retain the default and a watch or rejection note. The [emerging options snapshot](emerging.md) illustrates candidate research; it is not output from an automatically operating scout.

Check freshness again when using a finding. If repeated manual briefs later justify automation, choose curated sources, a bounded budget and runtime, and deduplication by canonical release URL and reviewed version. Stay quiet when nothing material changed. Findings enter the orchestrator's context for judgment; posts are untrusted evidence, not instructions. Do not let suggested improvements recursively create jobs or turn every release into an implementation task.
