# Emerging factory infrastructure

Research checked October 21, 2026. These are evaluation options, not installed capabilities. Keep Git, GitHub Actions, isolated task worktrees, and S3 or R2 artifacts as the starting defaults. Revisit a choice when work exposes a limit or fresh evidence suggests a useful capability.

This is a dated snapshot. The [proposed landscape-scouting process](landscape-scouting.md) describes how a factory could discover fresh releases, providers, and shipping approaches before existing work fails. No scout job is implemented or running in this kit; verify current primary evidence before a bounded trial or adoption.

## Source control and integration

**Current default:** Git and GitHub, separate task checkouts, revision-bound checks, and the owner's merge and release policy.

Anthropic's Scion is an internal source-control system built for an unusually large monorepo and extreme agent concurrency. Its October 13 article, updated October 15, explicitly says Scion is unsuitable as a general Git replacement and difficult to distribute publicly. Its reported performance gains describe Anthropic's workload. Adopt the transferable ideas: immutable artifacts, reusable caches, sparse access where appropriate, and API queries when files are unnecessary. Its reliance on post-merge and pre-deployment testing does not justify removing an ordinary project's integration gates. [Anthropic's account](https://www.anthropic.com/research/redesigning-source-control).

GitHub is rebuilding its own Git infrastructure around separate durable storage and serving compute while preserving Git workflows and governance. This is provider infrastructure work, not a replacement developers need to install. [October 6 announcement, updated October 7](https://github.blog/engineering/architecture-optimization/building-git-infrastructure-for-agent-scale-development/).

## Shared storage and agent environments

**Current default:** versioned source and guidance in Git, task state in explicit records, artifacts in S3 or R2, application state in its database, and writable task environments kept separate.

**Evaluate Archil** when agents on different machines repeatedly copy large datasets or lose useful context between environments. It provides persistent disks and Linux sandboxes; its August 28 announcement now marks persistent sandboxes generally available. It recommends other providers for GPUs and macOS or Windows. [Announcement](https://archil.com/post/introducing-persistent-sandboxes).

Shared files are a separate capability from source history, task isolation, and database transactions. Archil's mounted filesystem has ownership/delegation modes; its FUSE `flock` and `fcntl` locks do not coordinate different clients. Do not give concurrent agents one shared writable Git tree or assume shared database files provide transaction coordination. [Sharing modes](https://docs.archil.com/concepts/sharing-disks), [compatibility](https://docs.archil.com/details/support).

Archil documents strong consistency for committed disk operations, but client caches can lag. Its own S3 API reads the disk directly; synchronization with an attached backing bucket is eventual. Checkpoints and writable branches support experimentation, but disk branches share credential scope and are not security boundaries. [Consistency](https://docs.archil.com/details/consistency), [branches](https://docs.archil.com/concepts/branches-and-checkpoints).

## Planning and stronger proof

**Evaluate Chopin and PDD Kit.** GitHub's October 21 announcement presents them as research previews. Chopin explores collaborative planning with durable human decisions; its repository calls it experimental, unsupported software without a public instance for general use. Borrow the idea of preserving attributed decisions separately from changing plan prose before operating another service. [GitHub announcement](https://x.com/github/status/2112938664959562081), [Chopin source](https://github.com/githubnext/chopin).

The PDD announcement describes formal specifications and Verus proofs for Rust, with empirical checks where formal proof does not apply. This does not establish formal verification of arbitrary TypeScript, interfaces, or deployment behavior. People still judge whether the specification captures the intended outcome. Dedicated public PDD Kit installation availability was not independently established in this research; do not substitute a different Verus research repository or present it as an installed tool. [GitHub Next announcement](https://x.com/GitHubNext/status/2112936525457740139).

## Agent automation in CI

**Evaluate GitHub Agentic Workflows** for a maintenance task that already works manually. Its June 11 public-preview announcement describes Markdown compiled into ordinary Actions workflows, read-only defaults, isolated execution, and constrained write outputs. It complements deterministic CI rather than replacing it. [Announcement](https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/).

Promote an option only after comparing a representative workload: human interventions, rework, time to trustworthy proof, total cost, and recovery from failure. Preserve the current path until the replacement demonstrates improvement. Product availability and vendor claims are evidence to investigate, not proof of benefit in this factory.
