import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.slice(2).includes('--write');
if (process.argv.slice(2).some((arg) => !['--write', '--check'].includes(arg))) {
  throw new Error('Use --check (default) or --write to regenerate kit-local adapters.');
}
const read = (path) => readFileSync(join(root, path), 'utf8');
const manifest = JSON.parse(read('plugin.json'));
const errors = [];
const fail = (message) => errors.push(message);
const keys = ['name', 'version', 'description', 'author', 'homepage', 'repository', 'license', 'keywords'];
const compat = Object.fromEntries(keys.map((key) => [key, manifest[key]]));
const baseline = read('skills/grow-factory/assets/baseline.md');
const outputs = {
  '.claude-plugin/plugin.json': `${JSON.stringify(compat, null, 2)}\n`,
  '.cursor-plugin/plugin.json': `${JSON.stringify({ ...compat, rules: './rules/', skills: './skills/' }, null, 2)}\n`,
  'rules/factory-baseline.mdc': `---\ndescription: jstack shared operating baseline\nalwaysApply: true\n---\n\n<!-- Generated from skills/grow-factory/assets/baseline.md by just adapters. -->\n${baseline}`,
};
for (const [path, expected] of Object.entries(outputs)) {
  if (write) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), expected);
  }
  if (!existsSync(join(root, path)) || read(path) !== expected) fail(`${path}: stale; run just adapters`);
}
if (manifest.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json') fail('Wrong portable manifest schema');
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.name ?? '')) fail('Invalid plugin name');
if (!/^\d+\.\d+\.\d+$/.test(manifest.version ?? '')) fail('Use a semantic plugin version');
for (const key of keys) if (!manifest[key]) fail(`plugin.json: missing ${key}`);
for (const key of ['skills', 'mcpServers', 'apps', 'interface']) if (key in manifest) fail(`Nonportable manifest key: ${key}`);
const onboarding = manifest.extensions?.['com.openai']?.onboardingSkill;
if (!onboarding || !existsSync(join(root, onboarding))) fail('Missing onboarding skill');
const expectedSkills = ['factory-maintain', 'factory-stack', 'factory-work', 'grow-factory'];
const skills = readdirSync(join(root, 'skills'), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
if (JSON.stringify(skills) !== JSON.stringify(expectedSkills)) fail('Expected the four documented skill domains');
for (const name of skills) {
  const path = `skills/${name}/SKILL.md`;
  if (!existsSync(join(root, path))) { fail(`Missing ${path}`); continue; }
  const content = read(path);
  const header = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!header || !header[1].split('\n').includes(`name: ${name}`) || !/^description: \S.+$/m.test(header[1])) fail(`${path}: invalid name or description`);
}
function walk(path = '') {
  return readdirSync(join(root, path), { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git') return [];
    const next = join(path, entry.name);
    if (entry.isSymbolicLink()) { fail(`Unexpected symlink in source package: ${next}`); return []; }
    return entry.isDirectory() ? walk(next) : [next];
  });
}
for (const path of walk()) {
  if (/\.sh$/.test(path)) {
    const result = spawnSync('bash', ['-n', join(root, path)], { encoding: 'utf8', timeout: 10_000 });
    if (result.status !== 0) fail(`${path}: shell syntax check failed${result.error ? ` (${result.error.message})` : ''}\n${result.stderr ?? ''}`);
  }
  if (/\.(?:mjs|cjs|js)$/.test(path)) {
    const result = spawnSync(process.execPath, ['--check', join(root, path)], { encoding: 'utf8', timeout: 10_000 });
    if (result.status !== 0) fail(`${path}: JavaScript syntax check failed${result.error ? ` (${result.error.message})` : ''}\n${result.stderr ?? ''}`);
  }
  if (path.endsWith('.json')) { try { JSON.parse(read(path)); } catch { fail(`${path}: invalid JSON`); } }
  if (!/\.(?:md|mdc)$/.test(path)) continue;
  const prose = read(path).replace(/```[^\n]*\n[\s\S]*?```/g, '');
  for (const match of prose.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, '').split('#')[0];
    if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    const destination = resolve(root, dirname(path), decodeURIComponent(target));
    if (!destination.startsWith(`${root}/`) || !existsSync(destination)) fail(`${path}: broken or external local link ${target}`);
  }
}
if (errors.length) { process.stderr.write(`${errors.join('\n')}\n`); process.exitCode = 1; }
else process.stdout.write(`Structure and syntax checked: ${skills.length} skills, metadata, derived baseline, JSON, local link targets, shell, and JavaScript. No example scripts executed or client/infrastructure verification.\n`);
