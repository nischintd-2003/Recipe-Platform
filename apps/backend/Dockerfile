FROM node:20-alpine
 
WORKDIR /app
 
RUN npm install -g pnpm
 
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
 
COPY packages/ ./packages/
 
COPY apps/backend/ ./apps/backend/
 
RUN pnpm install --filter backend...
 
WORKDIR /app/apps/backend
 
EXPOSE 8000

CMD ["pnpm", "dev"]