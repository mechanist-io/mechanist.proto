#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status

echo "🔍 Pre-commit checks starting..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Create .env file for Docker Compose from template
echo "📄 Creating .env file for Docker Compose..."
if [ ! -f ".env.test" ]; then
    echo "❌ .env.test file not found. Please ensure it exists in the project root."
    exit 1
fi

# Copy template to docker directory as .env
cp .env.test infra/docker/developer/.env
echo "✅ Environment file created in docker directory"


# Check if containers are already running
POSTGRES_RUNNING=$(docker ps --filter "name=mamafi-postgres" --filter "status=running" -q)
REDIS_RUNNING=$(docker ps --filter "name=mamafi-redis" --filter "status=running" -q)

if [[ -z "$POSTGRES_RUNNING" || -z "$REDIS_RUNNING" ]]; then
    echo "🐳 Starting Docker Compose services..."
    cd infra/docker/developer
    docker compose up -d --remove-orphans
    cd ../../..
    
    echo "⏳ Waiting for services to be ready..."
    sleep 10
else
    echo "✅ Docker services already running"
fi

# Verify services are ready with retry logic
echo "🔍 Checking service health..."

# Check PostgreSQL
echo "Checking PostgreSQL..."
for i in {1..30}; do
    if docker exec mamafi-postgres pg_isready -U postgres >/dev/null 2>&1; then
        echo "✅ PostgreSQL is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ PostgreSQL not ready after 30 attempts"
        exit 1
    fi
    sleep 1
done

# Check Redis
echo "Checking Redis..."
for i in {1..30}; do
    if docker exec mamafi-redis redis-cli ping >/dev/null 2>&1; then
        echo "✅ Redis is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Redis not ready after 30 attempts"
        exit 1
    fi
    sleep 1
done

echo "✅ All services are ready"

# Run tests (environment variables will be loaded from the test setup)
echo "�� Running tests..."
NODE_ENV=test npm run migration:run
npm run test:e2e

echo "✅ All pre-commit checks passed!" 