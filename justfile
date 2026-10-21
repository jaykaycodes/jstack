# Structural and syntax checks only: no installation, provisioning, or client sessions.
default:
    @just --list

check:
    node scripts/check.mjs

# Regenerate kit-local compatibility manifests and the Cursor baseline rule.
adapters:
    node scripts/check.mjs --write
