# Stack and project profiles

These are defaults for new projects. Read the linked official docs before scaffolding or making API assumptions, choose compatible supported releases, and pin them. Existing useful systems do not need a migration to resemble this kit.

## Common foundation

Use [Bun](https://bun.com/docs) for TypeScript execution, dependency installation, and workspaces. Use TypeScript across the application and infrastructure where practical. Keep packages around real seams such as service contracts, persistence, and clients; a small project can start with one package.

Keep a compatible supported Node.js release pinned too. Bun does not eliminate Node requirements: [Expo uses Node for some tooling](https://docs.expo.dev/guides/using-bun/), and [Astro documents its supported Node versions](https://docs.astro.build/en/install-and-setup/). Check each selected profile before choosing tool versions.

Use [Effect v4](https://effect.website/docs/v4/getting-started) for core services: Schema at boundaries, typed expected errors, Layers for dependencies, scoped resources, and explicit concurrency. Use Effect HTTP and RPC for controlled application boundaries. Public third-party integrations should expose ordinary documented HTTP where that is the appropriate contract. UI components stay ordinary React or React Native; call service boundaries instead of turning component rendering into an Effect framework.

Before writing or debugging Effect code, read the v4 docs and installed `effect` source. `effect-solutions` can supply useful patterns only when verified against the installed v4 APIs. Keep module interfaces small and explicit, reuse sibling patterns, and migrate callers while deleting obsolete interfaces. Do not add a parallel homegrown retry, dependency, or workflow framework beside capabilities already selected.

Use [just](https://just.systems/man/en/) as the public command interface, [mise](https://mise.jdx.dev/) for pinned tools, and [Vite+](https://viteplus.dev/guide/) for lint, format, test, build, and task tooling in JS/TS projects. Configure the type checker explicitly as part of checks. Invoke the local `vp` command through `bun vp` inside recipes where installed. Use [Fallow](https://github.com/fallow-rs/fallow) to review unused code, duplication, and complexity; configure it for the chosen project and act on findings rather than quoting raw counts.

## Choose only the needed profile

| Profile | Default | Add when needed |
| --- | --- | --- |
| Content or small public site | [Astro](https://docs.astro.build/) with Cloudflare static assets or Workers | Server rendering and storage only for actual behavior |
| Interactive web | [React](https://react.dev/) + [Vite](https://vite.dev/guide/) + TypeScript | [TanStack Router and Query](https://tanstack.com/) for routing and server state that earn them |
| Application services | Bun + Effect HTTP/RPC + [Drizzle](https://orm.drizzle.team/docs/overview) + [pg](https://node-postgres.com/) + [Better Auth](https://www.better-auth.com/docs) | Authentication only if needed; ordinary HTTP for external clients |
| Mobile | [Expo](https://docs.expo.dev/) + React Native + Expo Router + EAS | Native [SwiftUI](https://developer.apple.com/xcode/swiftui/) or [Kotlin Compose](https://developer.android.com/compose) for real platform requirements |
| Compute and models | [Python + uv](https://docs.astral.sh/uv/) with [Modal](https://modal.com/docs) for offload | CPU/GPU capacity and remote builds when justified |

React + Vite is this kit's recommendation for a new interactive web app; it is not a claim that every source project uses that web stack. Avoid adding a full-stack framework when a static frontend and explicit service suffice.

Use EAS hosted builds for the Expo path. Native iOS builds and the iOS simulator need macOS and Xcode, using a remote Mac or hosted macOS continuous integration. The Linux agent box can orchestrate that work; it cannot act as the native iOS builder.

Use local PostgreSQL for development where PostgreSQL is the target. Use [PlanetScale Postgres](https://planetscale.com/docs/postgres) for substantial managed PostgreSQL applications. Use Cloudflare D1 only for simple applications whose data and transaction needs fit SQLite. Match the real database semantics; do not quietly replace PostgreSQL with D1.

Use [DBOS](https://docs.dbos.dev/typescript/programming-guide) with PostgreSQL for work requiring durable execution, recovery, or queues. It is not mandatory for every request handler. Define idempotency and external effects deliberately; adding a durable engine does not automatically make outside actions safe to repeat. Match guidance to the installed DBOS major version rather than copying older examples.

For product AI, choose an [OpenRouter](https://openrouter.ai/docs/quickstart) gateway or a direct model provider, with Effect AI when its released integration supports the selected Effect v4 version, or [AI SDK](https://ai-sdk.dev/docs/introduction) behind an Effect service as needed. The [Effect AI introduction](https://effect.website/docs/v3/ai/introduction) currently describes v3; check installed source and peer dependencies instead of treating those APIs as v4 guidance. Direct access may be simpler than adding a gateway. Coding-agent subscriptions and product API usage are separate billing paths. Choose models from current capability, price, latency, and task evidence rather than freezing a model ranking into instructions.

## Proof and operations

Use [Playwright](https://playwright.dev/docs/intro) against the actual browser artifact for web changes, and a real device or suitable device emulator with end-to-end checks for mobile. Exercise service and database boundaries with integration checks; compare real or golden data for analysis pipelines. Static success does not substitute for the changed behavior.

Use [Sentry](https://docs.sentry.io/) for errors, [PostHog](https://posthog.com/docs) for product analytics, and provider logs for infrastructure and runtime failures. Add the instrumentation that helps operate the chosen project, with appropriate data controls, rather than installing every integration on day one. Keep run artifacts in S3 or R2 according to the provider profile. Record revisions and proof locations in the task record.
