#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./step2_run_inference.sh                          # YAML defaults (mode + retries from execution:)
#   ./step2_run_inference.sh condition_b               # condition_b
#   ./step2_run_inference.sh condition_a --mode subprocess  # CLI override
#   ./step2_run_inference.sh condition_a --no-resume   # extra args

CONDITION="${1:-condition_a}"
shift || true  # Safely shift remaining arguments for proper passing to Python

cd "$(dirname "$0")"

echo "============================================================"
echo "🚀 Step 2: Run Inference"
echo "   Condition: $CONDITION"
echo "   (mode & max_retries from YAML execution: section)"
if [ $# -gt 0 ]; then
echo "   CLI overrides: $@"
fi
echo "============================================================"

python3 step2_run_inference.py --condition "$CONDITION" "$@"
