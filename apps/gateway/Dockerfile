# Build Stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/gateway ./apps/gateway
COPY libs ./libs

# Build application
RUN npm run build:gateway

# Production Stage
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist/apps/gateway ./dist/apps/gateway
COPY --from=builder /usr/src/app/dist/libs ./dist/libs

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/apps/gateway/src/main"]
