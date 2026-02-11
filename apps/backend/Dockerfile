# Build
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@10.28.2

# workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# shared packages
COPY packages/ ./packages/

# backend application
COPY apps/backend/ ./apps/backend/

# dependencies
RUN pnpm install --frozen-lockfile

# Production
FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@10.28.2

# workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# packages
COPY packages/ ./packages/

# backend source and dependencies from builder
COPY --from=builder /app/apps/backend ./apps/backend
COPY --from=builder /app/node_modules ./node_modules

# working directory to backend
WORKDIR /app/apps/backend

# Expose port
EXPOSE 8000

# Start the application
CMD ["pnpm", "dev"]