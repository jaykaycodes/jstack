#!/usr/bin/env node
// Read-only probes. Provider output never reaches this script's public output.
import { spawnSync } from 'node:child_process';

if (process.argv.includes('--help')) {
  console.log('Usage: node doctor.mjs\nRequires AWS CLI, GitHub CLI, AWS region, and FACTORY_GITHUB_REPO=owner/repo.\nMakes read-only provider requests; does not test writes, optional providers, or models.');
  process.exit(0);
}
if (process.argv.length !== 2) {
  console.error('FAIL unsupported arguments; use --help');
  process.exit(2);
}

let failed = false;
function probe(label, command, args) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    timeout: 20_000,
    maxBuffer: 256 * 1024,
    env: { ...process.env, AWS_PAGER: '', GH_PAGER: 'cat', GH_PROMPT_DISABLED: '1', AWS_MAX_ATTEMPTS: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const passed = !result.error && result.status === 0;
  console.log(`${passed ? 'PASS' : 'FAIL'} ${label}`);
  failed ||= !passed;
}

probe('AWS temporary or configured identity', 'aws', ['sts', 'get-caller-identity', '--output', 'json']);
probe('AWS EC2 read in selected region', 'aws', ['ec2', 'describe-instances', '--max-results', '5', '--no-paginate', '--output', 'json']);

const repository = process.env.FACTORY_GITHUB_REPO ?? '';
if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
  console.log('FAIL configure FACTORY_GITHUB_REPO as owner/repository');
  failed = true;
} else {
  probe('GitHub selected repository read', 'gh', ['api', '--hostname', 'github.com', '--silent', `repos/${repository}`]);
}

console.log('UNVERIFIED Cloudflare, PlanetScale, coding-agent response, write permissions, and application behavior');
console.log('Run failed probes locally to diagnose them; redact provider details before sharing.');
process.exitCode = failed ? 1 : 0;
