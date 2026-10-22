# Build and deliver an iPhone app from the agent box

Use the Linux box to edit, run Metro, and orchestrate EAS hosted builds and submissions. Local Xcode builds and the iOS simulator belong on a Mac with Xcode. A hosted Mac can also run `eas build --local` when owning the worker earns its cost. Start with EAS hosting rather than building a Mac fleet. These are adaptable instructions, not evidence that this kit has built or submitted an app.

## Prepare access and signing once

Pin Node, Bun, and EAS CLI with mise. Put the commands below behind project `just` tasks such as `mobile::dev`, `mobile::build`, `mobile::submit`, and `mobile::status`. Run examples from the mobile application directory on the agent box with its pinned environment and approved credentials.

The owner handles Apple Developer enrollment, identity verification, multifactor challenges, and agreements. The agent handles supported console, CLI, and API setup. Create or link the correct Expo project, bundle identifier, Apple team, and App Store Connect app record. Complete the initial prompted EAS build/credential setup before expecting unattended builds to work. Verify the resulting project and signing configuration rather than scripting answers to unfamiliar prompts. [Expo's CI preparation](https://docs.expo.dev/build/building-on-ci/).

Keep three kinds of credentials distinct: Expo login or `EXPO_TOKEN` for EAS; an App Store Connect API key for Apple automation; distribution certificates and provisioning profiles for signing. For a team API key, securely retain its one-time `.p8` download, key ID, and issuer ID. API access initially requires the Account Holder; Account Holder/Admin can create team keys. Choose the needed role deliberately: team keys span all apps and cannot be restricted to one app. [Apple API access](https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-api/).

Materialize private keys through the approved secret store into an owner-only directory and `0600` files on the box; clean up temporary copies. Do not put keys, passwords, or browser cookies in Git, arguments, screenshots, or chat. For EAS signing repair, its documented inputs include `EXPO_ASC_API_KEY_PATH`, `EXPO_ASC_KEY_ID`, `EXPO_ASC_ISSUER_ID`, `EXPO_APPLE_TEAM_ID`, and `EXPO_APPLE_TEAM_TYPE`. Configure submission credentials through EAS's supported credential flow too; a local file existing is not proof a remote submission can access it. [EAS credential inputs](https://docs.expo.dev/build/building-on-ci/).

## Separate the development and store loops

Configure these `eas.json` profiles, using explicit application config to select the intended bundle identifier and backend:

- `development`: `developmentClient: true`, `distribution: internal`, `environment: development`, and a development channel. Install `expo-dev-client`.
- `preview`: `distribution: store`, `environment: preview`, and a preview channel for TestFlight.
- `production`: `distribution: store`, `environment: production`, and a production channel.

Separate development/preview bundle identifiers and URL schemes let installations coexist. Configure them deliberately; a profile name does not automatically change app identity. Set `cli.appVersionSource: remote` and `autoIncrement: true` on store profiles for build numbers. Set the user-facing marketing version deliberately. Submission profiles need the correct `ascAppId`, which is distinct from the bundle identifier, team ID, and EAS project/build IDs. [Version management](https://docs.expo.dev/build-reference/app-versions/).

For your own iPhone, register the device on EAS:

```sh
mise exec -- eas device:create
```

Then build the development client. EAS CLI 19.1+ supports refreshing EAS-managed ad hoc profiles using configured Apple authentication, so newly registered phones are included:

```sh
mise exec -- eas build --platform ios --profile development --non-interactive --refresh-ad-hoc-provisioning-profile --wait
```

Without refresh, a successful build can reuse a profile missing the new phone. Follow the returned development install link. This ad hoc path differs from TestFlight. [Device/profile requirements](https://docs.expo.dev/build/internal-distribution/).

Serve Metro from Linux through an appropriate reachable tunnel. Expo's built-in tunnel needs its documented `@expo/ngrok` dependency installed first; include that in bootstrap. A managed Cloudflare tunnel is an alternative when configured for Metro's advertised URL. [Expo CLI networking](https://docs.expo.dev/more/expo-cli/).

```sh
mise exec -- bunx expo start --dev-client --tunnel
```

Open the resulting link in that installed development client. Treat the tunnel as development access, not authentication; use test data and protect anything sensitive. JavaScript edits reload without another binary. Native dependency, SDK, entitlement, or configuration changes need a compatible development rebuild. Stop Metro and its tunnel when finished. [Development builds](https://docs.expo.dev/develop/development-builds/introduction/).

## Build once, submit that build, inspect the result

After setup and the agreed release checks:

```sh
mise exec -- eas build --platform ios --profile preview --non-interactive --wait
```

Retain its build ID and link. Run long builds as background tasks through the client; use bounded status checks instead of endless polling. Verify source revision, profile, bundle ID, channel, environment, backend, runtime version, and build number. Submit that explicit EAS build ID through the matching submission profile:

```sh
mise exec -- eas submit --platform ios --profile preview --id YOUR_EAS_BUILD_ID --non-interactive --wait
```

Avoid `--latest` when concurrent builds or environments exist. A successful upload is not processing completion, an installable TestFlight build, App Review approval, or production release. Track those states separately and follow the owner's release authority. External TestFlight distribution can need beta review; internal testers need access to the app. [Submission](https://docs.expo.dev/submit/ios/), [CLI build selection](https://docs.expo.dev/eas/cli/), [TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/).

For scriptable Apple operations, use the independent [`rorkai/App-Store-Connect-CLI`](https://github.com/rorkai/App-Store-Connect-CLI), executable `asc`, not an assumed Apple-provided binary. Pin a supported release. Its upstream documents `asc auth login` with `--key-id`, `--issuer-id`, and `--private-key`; use `--bypass-keychain` on a headless host when appropriate and protect its config. Individual keys have different issuer semantics, so follow their documented flow.

Useful read commands after authentication:

```sh
mise exec -- asc auth status --validate
```

```sh
mise exec -- asc builds list --app YOUR_ASC_APP_ID --output table
```

```sh
mise exec -- asc testflight groups list --app YOUR_ASC_APP_ID --output table
```

Use the installed CLI's current help for metadata, screenshots, tester groups, and review operations; do not guess release flags. Keep each actual Apple build identifier distinct from its EAS build ID.

## Update compatible runtimes and prove startup

Set `runtimeVersion: { "policy": "fingerprint" }` in app config when using fingerprint-based compatibility. Publish only to the intended channel with the matching EAS environment:

```sh
mise exec -- eas update --channel preview --environment preview --message 'Describe the verified change'
```

Native changes need a new binary, not an OTA. SDK 55+ requires the explicit environment flag. `EXPO_PUBLIC_*` values are embedded public data; server secrets do not belong there. EAS secret-visibility variables are unavailable to local update bundling. [Runtime versions](https://docs.expo.dev/eas-update/runtime-versions/), [environment behavior](https://docs.expo.dev/eas/environment-variables/usage/).

After SDK upgrades, confirm Expo, React Native, and React compatibility and run `expo-doctor`. Prove a fresh launch and the changed flow on the intended build and real device or appropriate Mac simulator. A typecheck cannot detect every crash before JavaScript or error reporting starts. Give the person the exact install/TestFlight destination, build or update identifier, and what they should see. Record blocked device access honestly; upload success is not device proof.
