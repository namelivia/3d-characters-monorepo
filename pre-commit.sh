#!/bin/bash

set -eo pipefail

pnpm lint-staged
pnpm run -r --workspace-concurrency=1 pre-commit
