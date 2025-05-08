# Stage 1: Build the application
FROM node:20.14-alpine AS builder

WORKDIR /app

# Install all dependencies (including dev dependencies)
COPY yarn.lock ./
COPY package.json ./

# Copy the source code
COPY . .

RUN yarn install

# Build the application
RUN yarn build

# Stage 2: Run the application
FROM node:lts-slim

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only the necessary files (production dependencies and built app)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY db.crt /app/db.crt
COPY entrypoint.sh /app/entrypoint.sh

# Set permissions for entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Change ownership of the copied files to the 'node' user
RUN chown -R node:node /app

# Switch to the non-root user
USER node

# Expose the app port
EXPOSE 5000

# Run the application
ENTRYPOINT ["/app/entrypoint.sh"]
