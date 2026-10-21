# Ordered setup

The agent performs this sequence. Use Claude Code or Codex attached to a shell on the engineer's machine, then on the box. Chat-only Cowork/claude.ai can guide the work or hand off to a box session; connected tools may provide execution, but a prompt alone does not. [Claude Code Remote Control](https://code.claude.com/docs/en/remote-control) lets web/mobile front an existing host session.

## 1. Establish the outcome and sign in

Inspect existing tools, repositories, accounts, and credentials without displaying secrets. Learn the first project, region, budget, and shipping policy. Use [stack.md](stack.md) and [providers.md](providers.md) for new choices. A few concrete decisions are enough to start.

Follow [provider access](../../../references/access.md) to guide AWS, GitHub, Cloudflare, PlanetScale, and the chosen coding-client login as needed. Use browser/computer tools for available clicks; the owner handles passwords, MFA, billing enrollment, and required consent. Request the broadest supported role or token within the owner-authorized factory scope, and securely store the usable credentials on the box. Preserve authorization rather than repeatedly asking for routine setup actions.

## 2. Provision the admin box

Start with a dedicated AWS factory account and a persistent Linux EC2 box. Use the [reference provisioning and box setup](../../../examples/bootstrap/README.md), reviewing its inputs for the owner's region/network before running commands. It provides the concrete path; adapt the implementation rather than stopping at an infrastructure plan.

Use encrypted persistent storage, Systems Manager access, outbound connectivity, and an instance role with temporary AWS credentials. Start around 4 vCPU and 16 GB if budget permits; choose ARM when dependencies support it, otherwise x86. Grant broad account/box administration for bootstrap. Do not create AWS root keys. Record reconnect, recovery, resource ownership, and cleanup.

## 3. Install tools and operate the agent on the box

Use [mise](https://mise.jdx.dev/getting-started.html) with exact supported versions for Bun, Node.js, just, GitHub CLI, ripgrep, jq, and the selected cloud tooling. Add Python/uv for that profile. Start with the concrete tool setup in the reference, updating pins deliberately from current official docs.

On the box, from the reviewed tool configuration:

```sh
mise install
```

Follow mise's shell activation instructions for interactive use. Recipes and services should use `mise exec` from the intended project directory, or an explicit pinned-tool PATH. Services need their own working directory, environment, and credential access; shell startup files do not supply these automatically.

Install the chosen coding client from its official documentation and complete its login on the box. Authentication status checks confirm configuration; get a real response from that agent before calling it working. Keep the session running across disconnects using a supported persistent session arrangement.

## 4. Connect source and shared workflows

Clone the owner's project and workflow source. Wire the same four skills into the clients the owner uses: [Claude Code, Codex, and Cursor](../../grow-factory/references/shared-workflows.md). Preserve existing project instructions and record the adopted source revision. Start a project worktree; keep concurrent tasks and ports isolated.

## 5. Pass a real task and start the project

Use the reference's `just doctor` and `just check` as actual starting commands, then implement the project's [task contracts](../../grow-factory/references/bootstrap.md). Doctor should exercise needed provider capabilities as the current runtime, reporting missing required access as a failure. Do not run paid model probes just to check credentials; the agent's first real response is useful evidence already.

From the project root on the box:

```sh
mise exec -- just --list
```

For the selected Bun project, review package definitions, install, and commit its lockfile:

```sh
mise exec -- bun install
```

Existing-workspace reproducible installs and continuous integration use:

```sh
mise exec -- bun install --frozen-lockfile
```

Choose only the needed profile and start a real task. Use local development and preview first; add staging/production, authentication, durable work, and analytics when the project calls for them. GitHub Actions should call the same task interface. Keep infrastructure in Alchemy where supported, artifacts in S3/R2, and errors/logs available for the actual runtime.

The first-hour target is a reachable box, a real coding-agent response on it, a passing doctor/check, and a started project worktree with the next action. Signup delays can extend it. Deliver the project through [factory-work](../../factory-work/SKILL.md); improve from its friction through [factory-maintain](../../factory-maintain/SKILL.md).

## 6. Separate access before the trust boundary grows

Keep a deliberate admin path for factory repair. Before teammates, unattended jobs, production data, or unrelated projects share the setup, follow the [account split and teammate examples](../../../examples/bootstrap/README.md). Daily/project identities receive scoped credentials, not a shared admin token. Prove replacement roles and both sides of cross-account trust before revoking or rotating bootstrap credentials. Same-account IAM administration is not isolation from someone who can change the policies. The access guide owns provider details.
