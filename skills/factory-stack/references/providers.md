# Provider defaults

These are a starting policy, not vendor superiority claims. Keep an effective existing platform unless the project gives a concrete reason to change it. Use [Alchemy](https://alchemy.run/infrastructure-as-code/provider/) as the default TypeScript infrastructure-as-code layer for AWS, Cloudflare, and PlanetScale. Check each resource's current provider support and document any deliberate manual step or alternative instead of hiding it in prose.

## AWS for the box and main product

Start with a persistent EC2 Linux agent box in the owner's account, encrypted persistent storage, and [Systems Manager Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html) access. Suggest 4 vCPU and 16 GB memory as an initial development size, then fit the budget and actual workload. Prefer ARM when the needed native dependencies and clients support it; use x86 otherwise. Set spending visibility before increasing capacity.

The owner should control the account, and the agent should administer its own environment and granted infrastructure. Use IAM roles and workload identity for services, Systems Manager Parameter Store or Secrets Manager for appropriate configuration and secrets, and S3 for AWS-local objects and build artifacts. Do not depend on a developer's interactive shell credentials for a scheduled service.

Use AWS for the main product application and control plane when persistent services, networking, or AWS-local data make that useful. ECS Fargate is the default container service when a managed container deployment is warranted. Lambda fits small stateless event or request handlers with suitable runtime and lifecycle requirements; it is not a reason to fragment every service.

## Cloudflare where it simplifies the project

Use [Cloudflare DNS](https://developers.cloudflare.com/dns/) and its CDN even when the application origin runs in AWS. For quick personal or internal HTTP applications and content sites, default to [Workers](https://developers.cloudflare.com/workers/) with static assets, or Pages where it fits the existing site. Protect internal tools with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/).

Choose [R2](https://developers.cloudflare.com/r2/) for objects where edge access or egress patterns fit; keep S3 when AWS locality or integration is more useful. Use [D1](https://developers.cloudflare.com/d1/) for simple small SQLite-shaped applications. It is not PostgreSQL and is not a required step on the way to PostgreSQL.

Workers use their own runtime. Do not deploy an unchanged Bun server or assume Node compatibility means every Bun API works. Use documented adapters and supported libraries for the chosen application profile. If Workers need PostgreSQL, follow the driver's current supported connection approach, such as [Hyperdrive](https://developers.cloudflare.com/hyperdrive/), and test actual queries in that runtime.

## PlanetScale for substantial managed Postgres

Default to [PlanetScale Postgres](https://planetscale.com/docs/postgres) when the application needs a substantial managed PostgreSQL database, scaling, or high availability. Use local PostgreSQL for development. There is no invented traffic threshold or automatic claim that one vendor outperforms all others. Align database and application regions, manage connection limits, and plan schema migration, backups, and recovery with the chosen service.

## Source, delivery, and offload

Use GitHub repositories, pull requests, and [GitHub Actions](https://docs.github.com/en/actions) for initial continuous integration. Add [Buildkite](https://buildkite.com/docs) when owning workers or heavy/custom continuous integration jobs actually helps; it is not bootstrap overhead every friend needs.

Use [Modal](https://modal.com/docs) for CPU/GPU jobs, expensive builds, model work, and rendering that would exhaust the agent box. Keep offload reproducible, bound its cost and runtime, and collect artifacts in S3 or R2. Stop only resources owned by the completed task.
