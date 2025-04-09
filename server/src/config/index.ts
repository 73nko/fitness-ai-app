import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration object
export const config = {
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || '0.0.0.0',
  },
  grpc: {
    port: parseInt(process.env.GRPC_PORT || '50051', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    connectionTimeout: parseInt(process.env.REDIS_TIMEOUT || '5000', 10),
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10),
  },
  db: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:password@localhost:5432/fitness',
  },
};
