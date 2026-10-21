# Evolve from one administrator to scoped daily boxes

Keep the initial full-admin path while getting the first useful project loop working. Then review everyday access. Establish these boundaries before production customer data, teammates, unattended jobs, or unrelated projects enter the setup. This is a reference path, not a claim that this pull request has created or tested accounts or policies.

The fictional management, staging, production, and unrelated-project account numbers are `111111111111`, `222222222222`, `333333333333`, and `444444444444`. The examples use `us-east-1`. Replace them everywhere with real values before execution. Addresses ending in `.invalid` intentionally cannot be used to create real accounts.

## Create or reuse the organization

From the authorized management administrator session, inspect the existing organization first. Create one only if there is none and the owner authorized account creation and consolidated billing:

```sh
aws organizations describe-organization
```

If needed, in that same management session:

```sh
aws organizations create-organization --feature-set ALL
```

Create the chosen member accounts deliberately. Each needs a unique reachable owner-controlled email, not the placeholders below. Record each request identifier:

```sh
aws organizations create-account --email aws-staging@example.invalid --account-name factory-staging --role-name OrganizationAccountAccessRole
aws organizations create-account --email aws-production@example.invalid --account-name factory-production --role-name OrganizationAccountAccessRole
aws organizations create-account --email aws-unrelated@example.invalid --account-name unrelated-project --role-name OrganizationAccountAccessRole
```

Account creation is asynchronous. Check each returned request identifier until it succeeds or reports a failure. Do not assume the request ID is an account ID:

```sh
aws organizations describe-create-account-status --create-account-request-id YOUR_REQUEST_ID
```

Record the actual account IDs, management account, billing ownership, and recovery contacts. Existing invited accounts do not automatically receive `OrganizationAccountAccessRole`; establish their trust from an authorized session in that account. Organizations-created accounts do receive it. Keep the management account for administration, not ordinary application workloads.

You can group production and non-production accounts into organizational units and apply tested service control policies later. SCPs limit permissions; they grant none and do not constrain management-account identities. Do not describe a permissive organization layout as an enforced restriction.

## Establish explicit administrator trust

The management admin box's role needs permission to assume each intended target role. The initial management `AdministratorAccess` already supplies source permission, but a narrowed source policy could contain:

```json
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"sts:AssumeRole","Resource":["arn:aws:iam::222222222222:role/FactoryMaintenance","arn:aws:iam::333333333333:role/FactoryMaintenance"]}]}
```

In each member account, create `FactoryMaintenance` with the intended administrator policy and a trust policy constrained to the management admin role. Create this through its bootstrap role, then retire or restrict redundant bootstrap trust when recovery is established. Example destination trust:

```json
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":"arn:aws:iam::111111111111:root"},"Action":"sts:AssumeRole","Condition":{"ArnEquals":{"aws:PrincipalArn":"arn:aws:iam::111111111111:role/factory-admin"}}}]}
```

This account principal plus role condition intentionally trusts a specific role name, not every identity in management. Administrators who control that source role can still replace or modify it. This is a deliberate maintenance path, not an independent human approval gate.

Use an AWS profile on the admin box rather than exporting STS credentials into logs or shell history. In its local AWS config:

```ini
[profile factory-staging-admin]
role_arn = arn:aws:iam::222222222222:role/FactoryMaintenance
credential_source = Ec2InstanceMetadata
region = us-east-1

[profile factory-production-admin]
role_arn = arn:aws:iam::333333333333:role/FactoryMaintenance
credential_source = Ec2InstanceMetadata
region = us-east-1
```

As that box's actual agent user, verify each profile's account identity locally. Do not share account identifiers in a public run record:

```sh
aws --profile factory-staging-admin sts get-caller-identity
aws --profile factory-production-admin sts get-caller-identity
```

## Launch a narrower daily box

Provision the daily EC2 box **in staging**, using the networking, storage, IMDSv2, and Session Manager approach in [the admin example](provision.md), but replace its administrator role with the following daily role. From the admin box's staging profile, create that role and instance profile once:

```sh
aws --profile factory-staging-admin iam create-role --role-name factory-daily --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
aws --profile factory-staging-admin iam attach-role-policy --role-name factory-daily --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
aws --profile factory-staging-admin iam create-instance-profile --instance-profile-name factory-daily
aws --profile factory-staging-admin iam add-role-to-instance-profile --instance-profile-name factory-daily --role-name factory-daily
```

Attach the reviewed [teammate-role.json](teammate-role.json) as an inline policy, after substituting the real region, staging account, and parameter namespace. From the local directory containing that JSON:

```sh
aws --profile factory-staging-admin iam put-role-policy --role-name factory-daily --policy-name FactoryDailyScope --policy-document file://teammate-role.json
```

Launch with the staging profile, staging VPC and subnet, and `--iam-instance-profile Name=factory-daily`. Do not run the administrator-policy attachment commands from the initial provisioning example for this box.

The JSON grants known-name parameter reads only within the chosen staging prefix and a harmless EC2 read. It denies parameter retrieval elsewhere, recursive path reads, secret-value retrieval from Secrets Manager, role assumption, and IAM changes. The explicit parameter restriction counters the wildcard parameter reads in `AmazonSSMManagedInstanceCore`. Use `GetParameter` or `GetParameters` with known names; do not add a parent recursive read to make discovery easier.

For `SecureString` encrypted with a customer-managed key, add only the required key's decrypt permission with suitable encryption-context constraints, and configure the matching key policy. Without that, encrypted reads may correctly fail. If choosing Secrets Manager instead, replace the blanket secret-value deny with a reviewed narrow policy for the intended environment; do not merely add an allow that the deny overrides.

This minimal daily role can develop locally and read its staging inputs; it cannot deploy arbitrary infrastructure. Add actual project deployment actions through a reviewed narrow role or CI identity when needed. Do not attach `AdministratorAccess` and call it scoped development. If a project intentionally grants staging administrator access, accept that it controls the staging account and keep protected material elsewhere.

Keep broad GitHub, Cloudflare, PlanetScale, and production credentials on the controlled admin path. Issue project-specific credentials to daily boxes and application identities. Never copy the admin box's home directory or credential vault into a teammate image. Use separate recovery and access ownership for unrelated projects rather than sharing all bootstrap credentials.

## Prove the boundary and finish

As the daily identity, verify intended staging reads and Session Manager access work. Check that production role assumption, a known management secret read, a secret outside the staging prefix, and ancestor-path recursive reads are denied. Use non-sensitive canary parameters for denial checks; suppress response bodies and never print real secret values. Repeat from actual scheduled-service identities when those are introduced.

Prove an authorized application deployment separately; successful AWS identity and read probes do not establish it. Revoke or rotate broad credentials that were replaced, preserve the deliberate recovery path, and record remaining gaps. Future role or policy changes require repeating the affected allowed and denied checks.

Sources: [AWS multi-account practices](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_best-practices.html), [account creation](https://docs.aws.amazon.com/accounts/latest/reference/API_CreateAccount.html), [SCP behavior](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html), [parameter restrictions](https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-restrict-parameter-access.html), and [Session Manager policy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonSSMManagedInstanceCore.html).
