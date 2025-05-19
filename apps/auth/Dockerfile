# Build Stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/auth ./apps/auth
COPY libs ./libs

# Build application
RUN npm run build:auth

# Production Stage
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist/apps/auth ./dist/apps/auth
COPY --from=builder /usr/src/app/dist/libs ./dist/libs

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/apps/auth/src/main"]
