# Provision one admin box with AWS CLI

This is one concrete path using AWS CLI rather than a second infrastructure framework. It creates billable resources, has not been run by this pull request, and is not a rerunnable installer. Review the access and budget grant first. Use fresh names; if a resource already exists, inspect it instead of silently replacing it. Convert the chosen configuration to your infrastructure-as-code after the first useful loop works.

## Launch from the owner's authenticated AWS session

Run these commands in AWS CloudShell, or an administrator's terminal with a temporary federated session. Use the intended account and region. Never bootstrap by creating root access keys. Check identity locally before any write:

```sh
aws sts get-caller-identity
```

Choose a real region and an existing public subnet with a route to an internet gateway. This example assigns a public address for outbound provider access but opens no inbound ports. A private subnet with NAT or suitable VPC endpoints is an alternative with different cost and connectivity requirements. Replace every uppercase placeholder below. An ARM instance requires ARM-compatible tools; select an x86 AMI and instance type together if needed.

```sh
export AWS_REGION='YOUR_REGION'
export AWS_DEFAULT_REGION="$AWS_REGION"
export FACTORY_VPC_ID='YOUR_VPC_ID'
export FACTORY_SUBNET_ID='YOUR_PUBLIC_SUBNET_ID'
export FACTORY_NAME='factory-admin'
```

Create the EC2 service trust document in that terminal:

```sh
cat > factory-ec2-trust.json <<'JSON'
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}
JSON
```

Create the owner-authorized full administrator role and attach it to an instance profile. `AdministratorAccess` is intentionally broad during bootstrap. It is not a root login or an enforced limit on what this administrator can change.

```sh
aws iam create-role --role-name "$FACTORY_NAME" --assume-role-policy-document file://factory-ec2-trust.json
aws iam attach-role-policy --role-name "$FACTORY_NAME" --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
aws iam attach-role-policy --role-name "$FACTORY_NAME" --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
aws iam create-instance-profile --instance-profile-name "$FACTORY_NAME"
aws iam add-role-to-instance-profile --instance-profile-name "$FACTORY_NAME" --role-name "$FACTORY_NAME"
```

Create a new security group. Its normal default outbound rule allows internet access; confirm the subnet route and network ACL support it. Do not add SSH ingress for this path.

```sh
export FACTORY_GROUP_ID="$(aws ec2 create-security-group --group-name "$FACTORY_NAME" --description 'Agent admin box; Session Manager access' --vpc-id "$FACTORY_VPC_ID" --query GroupId --output text)"
```

Resolve the current Amazon Linux 2023 ARM image from AWS's public parameter. Record the resolved AMI in your local factory inventory for reproducibility; the moving public parameter is only discovery.

```sh
export FACTORY_AMI_ID="$(aws ssm get-parameter --name /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-arm64 --query Parameter.Value --output text)"
```

Launch once. The example uses 4 vCPU, 16 GB memory, and an encrypted 80 GB root volume retained after termination. Confirm current price and fit the owner's budget before running it. IAM changes can take time to propagate; if the profile is not yet available, check it and retry only after confirming no instance was created.

```sh
export FACTORY_INSTANCE_ID="$(aws ec2 run-instances --image-id "$FACTORY_AMI_ID" --instance-type t4g.xlarge --count 1 --iam-instance-profile "Name=$FACTORY_NAME" --network-interfaces "DeviceIndex=0,SubnetId=$FACTORY_SUBNET_ID,Groups=$FACTORY_GROUP_ID,AssociatePublicIpAddress=true" --metadata-options 'HttpTokens=required,HttpEndpoint=enabled' --block-device-mappings '[{"DeviceName":"/dev/xvda","Ebs":{"VolumeSize":80,"VolumeType":"gp3","Encrypted":true,"DeleteOnTermination":false}}]' --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$FACTORY_NAME},{Key=Owner,Value=factory-bootstrap}]" --query 'Instances[0].InstanceId' --output text)"
aws ec2 wait instance-status-ok --instance-ids "$FACTORY_INSTANCE_ID"
```

Amazon Linux 2023 normally includes SSM Agent. Confirm that this specific instance registers as online before treating access as ready. A running EC2 instance is not proof of Session Manager connectivity.

```sh
aws ssm describe-instance-information --filters "Key=InstanceIds,Values=$FACTORY_INSTANCE_ID" --query 'InstanceInformationList[].PingStatus' --output text
```

Use EC2's **Connect > Session Manager** in the AWS console, or run the following from a terminal with the [Session Manager plugin](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html) installed:

```sh
aws ssm start-session --target "$FACTORY_INSTANCE_ID"
```

Keep the instance, role/profile, security group, region, resolved AMI, and retained volume identifiers in the private local inventory. Stop or terminate only resources you own. Stopping avoids compute charges but retained EBS and public address/storage choices can still cost money. Retained root storage prevents accidental deletion, but does not provide backup or automatic restoration; document volume recovery and take appropriate snapshots before relying on the box.

## Set up the box as the actual agent user

In the Session Manager shell, use the standard non-root user for tools and client credentials. On this image:

```sh
sudo -iu ec2-user
```

Set the intended region again in this box session, replacing the placeholder with the region used at launch. CloudShell or laptop environment variables do not carry into Session Manager or survive a login-user change:

```sh
export AWS_REGION='YOUR_REGION'
export AWS_DEFAULT_REGION="$AWS_REGION"
```

Install Git using the operating system package manager. Download mise's installer, inspect it, then run it as this user; review the [current installation instructions](https://mise.jdx.dev/getting-started.html) if its distribution changes.

```sh
sudo dnf install -y git
curl --fail --location https://mise.run --output /tmp/factory-mise-installer.sh
less /tmp/factory-mise-installer.sh
sh /tmp/factory-mise-installer.sh
export PATH="$HOME/.local/bin:$PATH"
mkdir -p "$HOME/factory-bootstrap"
cd "$HOME/factory-bootstrap"
```

Select supported versions once, then commit the exact resulting `mise.toml` in your own repository. `--pin` resolves these selectors to exact versions; do not keep moving `latest` selectors in the adopted configuration. Confirm the current [mise backends](https://mise.jdx.dev/registry.html) before changing this list.

```sh
mise use --pin bun@latest node@lts just@latest github-cli@latest aws-cli@latest
```

Copy this example's `doctor.mjs`, `teammate-role.json`, and `justfile` here. Review copied configuration before trusting it. Use `mise exec --` for commands and service launchers so the pinned environment does not depend on an interactive shell's activation.

```sh
mise exec -- gh auth login --web
mise exec -- gh auth setup-git
mise exec -- just check
```

Follow the [provider access sequence](../../references/access.md), set `FACTORY_GITHUB_REPO`, and run `mise exec -- just doctor`. Install the owner's coding client from its current official instructions. Complete sign-in, obtain a real response, and start the first project. Configure later headless services with this user's intended working directory, pinned tool environment, region, and own credential access; do not assume they inherit the Session Manager shell. Set `AWS_REGION` and `AWS_DEFAULT_REGION` explicitly in each service's launch environment, or configure the intended AWS profile's region for that service user.

Once the first useful loop works, review and replace broad everyday credentials. The admin box can retain a deliberate elevated maintenance path; narrower daily boxes must not receive its vault. Apply the [account split](accounts.md) before the stated production, teammate, unattended-job, or unrelated-project triggers.

Sources: [EC2 IAM roles](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html), [Amazon Linux public AMI parameters](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-public-parameters-ami.html), [Session Manager prerequisites](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-prerequisites.html), and [mise use](https://mise.jdx.dev/cli/use.html).
