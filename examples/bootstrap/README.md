# One working way to start

These are original reference implementations to adapt, not an installer or a required platform. Identities and account numbers are fictional. The source has been reviewed, but **this pull request has not run it against a cloud account, installed clients, or proved a live login**. Read every command and substitute real choices before executing it.

1. Follow the [access guide](../../references/access.md) to agree on scope and sign in.
2. Use the [EC2 provisioning path](provision.md) from the owner's authenticated AWS console or CloudShell. It creates new, billable resources only when you deliberately run it.
3. Copy [doctor.mjs](doctor.mjs), [justfile](justfile), and [teammate-role.json](teammate-role.json) into a local bootstrap directory on the box. Keep all three together. Use the example task interface there, rather than replacing an application's existing justfile.
4. Run the structural check, configure a real GitHub repository, then run the read-only doctor as the actual agent user. The doctor makes network requests but never creates or changes provider resources.
5. Start a coding client, get a real response, and begin the first project. The doctor does not make paid model calls or certify a login from files alone.
6. Use the [account-split guide](accounts.md) when daily work needs isolation. Its [role policy](teammate-role.json) illustrates a narrow daily box, not a policy to attach unchanged to the bootstrap administrator.

On the box, in the directory containing these three example files:

```sh
mise exec -- just check
```

Set the owner/repository you intend to work on, without credentials in the command:

```sh
export FACTORY_GITHUB_REPO='YOUR_OWNER/YOUR_REPOSITORY'
```

Then, as the same user and runtime that will run the agent:

```sh
mise exec -- just doctor
```

`check` only validates JavaScript syntax and the example JSON policy structure. `doctor` requires a real AWS identity, an EC2 read in the selected region, and a GitHub repository read. Set the [region in the box session](provision.md#set-up-the-box-as-the-actual-agent-user); the launching terminal's environment does not transfer. It suppresses provider response bodies and reports only pass or fail. Identity checks and reads do not prove cloud write permissions, application behavior, or model access. Optional Cloudflare and PlanetScale integrations remain unverified until you add their real probes.

For Cloudflare, use the stored account token to read the selected account or required resource through its supported API. For PlanetScale, use its stored service token identifier and secret to read the selected organization or database. Keep API responses and authorization headers out of the doctor output; use the actual service runtime's credentials and fail on authorization errors. Select endpoints from the current [Cloudflare API](https://developers.cloudflare.com/api/) and [PlanetScale API](https://planetscale.com/docs/api/overview). A successful token verification endpoint alone does not prove access to the project resource.

Record evidence outside this public repository. After the project begins, add real `dev`, `prove`, and `deploy` tasks in that project's own interface. This example deliberately provides no fake application or passing deploy placeholder.
