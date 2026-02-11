# Build
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@10.28.2

# workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# shared packages
COPY packages/ ./packages/

# frontend application
COPY apps/frontend/ ./apps/frontend/

# dependencies
RUN pnpm install --frozen-lockfile

# Build the frontend
WORKDIR /app/apps/frontend
RUN pnpm build

# Production
FROM nginx:alpine

# nginx configuration
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# built files from builder
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]