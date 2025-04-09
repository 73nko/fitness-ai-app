FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY web/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY web/. .

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Set environment to production
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]