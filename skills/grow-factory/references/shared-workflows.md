# One workflow library, three clients

Keep one versioned source of the four skills: `grow-factory` for bootstrap, `factory-stack` for technology choices, `factory-work` for delivery, and `factory-maintain` for improvement. A plugin distributes those files. It does not grant access or make every client's agent and rule formats identical.

The kit includes a portable root [plugin.json](../../../plugin.json), generated Claude and Cursor compatibility manifests, and a generated Cursor baseline rule. The [baseline](../assets/baseline.md) remains canonical. [Role contracts](../../factory-work/references/roles.md) are shared task instructions; native subagent definitions and model selection are deliberately left to the client's supported configuration.

Use these routes on the machine running the client, including the persistent agent box. Keep the entire checkout because references cross skill folders. The [ordered setup](../../factory-stack/references/setup.md) owns box provisioning and sign-in; this page owns client wiring. These instructions received source/static checks, not live client tests.

## Start without installation

Clone the kit into a new directory on your development machine:

```sh
git clone https://github.com/jaykaycodes/software-factory-starter "$HOME/src/software-factory-starter"
```

Give any agent this instruction, replacing the path with the checkout's absolute path:

```text
Read /absolute/path/software-factory-starter/README.md, then
/absolute/path/software-factory-starter/skills/grow-factory/SKILL.md.
Use the shared stack, delivery, and maintenance skills from that checkout.
Help me bootstrap my factory through a real project.
```

Record the source revision in local factory notes:

```sh
git -C "$HOME/src/software-factory-starter" rev-parse HEAD
```

For a project that adopts the kit, merge the [entrypoint template](../assets/AGENTS.template.md) into its existing client instructions. Use real absolute paths or checked-in project-relative paths. Preserve existing rules. An installed skill is discoverable workflow source; it does not automatically load the baseline in every session.

## Claude Code

From the application repository on the machine running Claude Code, start a session with this checkout loaded:

```sh
claude --plugin-dir "$HOME/src/software-factory-starter"
```

Invoke the bootstrap skill in that session:

```text
/software-factory-starter:grow-factory
```

Use the same namespace for the other three skills. Point the project's `CLAUDE.md` at its local `AGENTS.md` and the canonical baseline, preserving existing content. A plugin's skill files do not replace that project entrypoint. For a service launching Claude, pass the plugin path in the actual launch configuration, then verify the running service loads it. [Claude's plugin documentation](https://code.claude.com/docs/en/plugins/create) describes session loading and skill namespacing.

## Codex

Codex can discover skills from a project's `.agents/skills` and follow symlinked skill folders. From the application repository on the machine running Codex, create that directory if needed:

```sh
mkdir -p .agents/skills
```

Link each skill to the retained checkout. `ln -s` refuses an existing destination; inspect collisions instead of replacing someone else's skills:

```sh
for skill_name in grow-factory factory-stack factory-work factory-maintain; do
  ln -s "$HOME/src/software-factory-starter/skills/$skill_name" ".agents/skills/$skill_name" || break
done
```

Merge the local baseline pointer and project routing into `AGENTS.md`. Start a fresh Codex session in that project and request `$grow-factory`, or explicitly name the file. This route does not require marketplace registration. The root manifest also packages the same source for compatible plugin loaders; no marketplace catalog is supplied here. See [Codex skill discovery](https://learn.chatgpt.com/docs/build-skills) and [AGENTS.md configuration](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Do not expect Codex to import Claude or Cursor native subagent definitions. Supply the shared role contract through Codex's supported delegation mechanism when useful.

## Cursor

On the machine running Cursor, use **Customize** to import this plugin from disk, or follow its documented local plugin path. For the local route, first create the parent directory:

```sh
mkdir -p "$HOME/.cursor/plugins/local"
```

Copy the complete checkout into a new local-plugin directory. This command fails rather than replacing an existing installation:

```sh
node -e 'require("node:fs").cpSync(process.env.HOME + "/src/software-factory-starter", process.env.HOME + "/.cursor/plugins/local/software-factory-starter", { recursive: true, errorOnExist: true, force: false, filter: (source) => !source.split("/").includes(".git") })'
```

Reload Cursor and inspect **Customize** for the four skills. Invoke `/grow-factory`. If Cursor chooses the portable manifest, skills remain available but Cursor-specific rules may not load. Keep a project baseline pointer in its supported instructions and inspect the rule list rather than assuming parity. The compatibility manifest declares `skills/` and `rules/` for the Cursor format.

The local copy is a distribution artifact. Edit the source checkout, regenerate adapters, then deliberately refresh the copy and check its revision. Do not use a symlink from the local-plugin directory to an outside checkout; Cursor documents a restriction on those targets. Organization policy can also prohibit local imports. See [Cursor plugins](https://cursor.com/docs/plugins). Explicit file reads remain the fallback.

## Prove the wiring, then maintain it

In a fresh session for each client you use, give a small real request and ask which workflow it selects, its actual source path, and the source revision. Inspect the loaded file and the actions taken. A settings file existing is not proof. If auto-discovery fails, repair the adapter or report it as unverified while using explicit reads.

When editing this source checkout, run `just adapters` to regenerate compatibility manifests and the Cursor rule, then `just check` for package structure. Neither command writes user or project configuration outside this kit. Review upstream changes before updating your local factory, preserve adaptations, and verify affected workflows. A public GitHub repository is source distribution, not certification or publication in any client's plugin directory.
