FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY mobile/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY mobile/. .

# Expose the default Metro bundler port
EXPOSE 8081

# Default command to start Metro bundler
CMD ["npm", "start"]