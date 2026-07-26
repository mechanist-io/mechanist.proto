#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status

echo "🔍 Pre-commit checks starting..."

echo "🧪 Running tests..."
NODE_ENV=test npm run test:e2e

echo "✅ All pre-commit checks passed!"
