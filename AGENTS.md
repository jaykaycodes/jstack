# Working on this kit

Read [README.md](README.md) and the canonical [baseline](skills/grow-factory/assets/baseline.md). This repository contains reusable instructions and metadata, not a provisioned factory or deployed application.

Use [factory-work](skills/factory-work/SKILL.md) for substantial changes and [factory-maintain](skills/factory-maintain/SKILL.md) when improving the kit from observed work. The [stack skill](skills/factory-stack/SKILL.md) owns implementation defaults.

Keep shared rules in the baseline and workflow behavior in `skills/`. Client manifests and the Cursor rule are derived by `just adapters`; do not maintain separate prose copies. Run `just check` for structural checks. These checks do not establish client loading, cloud access, or application behavior. Honor the user's requested verification scope.

Preserve client compatibility and keep examples fictional. Do not add secrets, environment identities, dummy services, or automatic publication. This entrypoint governs editing this kit; it does not install these workflows in another repository.
