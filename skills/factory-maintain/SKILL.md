---
name: factory-maintain
description: Improve factory tools, instructions, dependencies, or infrastructure from repeated friction or a human correction. Use for an evidence-based maintenance pass; use factory-work for product changes and grow-factory for initial setup.
---

# Improve the next run

Read the [shared baseline](../grow-factory/assets/baseline.md) and [maintenance loop](../grow-factory/references/maintenance.md). Start from a real task, not a list of possible agent tools.

1. Inspect relevant failures, corrections, run records, and reviews. Pick one recurring cause or explicit human correction and link the evidence.
2. Choose the smallest change that removes the cause. Prefer deleting friction or adding an executable check over expanding instructions. Use [factory-stack](../factory-stack/SKILL.md) for a new provider, runtime, or library decision.
3. Record the before measurement and expected improvement. Make a bounded change within the owner's policy. Keep unrelated suggestions separate.
4. Repeat the representative scenario. For substantial changes, use independent review through [factory-work](../factory-work/SKILL.md). For instruction changes, observe a fresh session when claiming changed agent behavior.
5. Adopt, revise, revert, or mark unverified. Report the evidence and stop. Add a schedule only after a useful manual pass and a recurring need.

When changing guidance, apply the authoring rules in the maintenance reference. When editing this kit's metadata or baseline, regenerate adapters with `just adapters` and run `just check`. This validates package structure, not the claimed operational improvement.
