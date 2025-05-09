# Algo Boilerplate

This project is based on the NestJS framework and includes an extensible boilerplate setup.

## Overview

To tailor this project for your own needs, locate the folder or module named algo-boilerplate and modify or rename its components as required.

This boilerplate was created by the Algo Alliance team. For more information or questions, please reach out to:

- Behrad Kazemi
- Hamid Firouzan

## Requirements

Make sure the following services are running:

- PostgreSQL (configured in .env)
- Redis (configured in .env)

You can use the provided `.env.example` file:
```bash
cp .env.example .env
```

Then, modify the values as necessary for your environment.

## Scripts

To get started with the project:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the application
npm run start

# Run all end-to-end tests
npm run test:e2e

# Generate a new migration
npm run migration:generate -n -- ./infra/database/migrations/migrationname

# Run all migrations
npm run migration:run

# Run a specific e2e test file
npx jest tests/e2e/specifictestname.e2e-spec.ts --detectOpenHandles
```