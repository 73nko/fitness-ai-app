import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { createClient, RedisClientType } from 'redis';

interface RedisPluginOptions {
  // Plugin options if needed
}

const redisPlugin: FastifyPluginAsync<RedisPluginOptions> = async (
  fastify,
  options
) => {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

  // Create Redis client
  const redisClient: RedisClientType = createClient({
    url: redisUrl,
  });

  // Handle Redis connection events
  redisClient.on('error', (err) => {
    fastify.log.error('Redis connection error:', err);
  });

  redisClient.on('connect', () => {
    fastify.log.info('Connected to Redis');
  });

  redisClient.on('reconnecting', () => {
    fastify.log.info('Reconnecting to Redis');
  });

  try {
    await redisClient.connect();
  } catch (err) {
    fastify.log.error('Failed to connect to Redis:', err);
    // Not throwing error to make Redis optional
  }

  // Make Redis client available through fastify.redis
  fastify.decorate('redis', redisClient);

  // Close Redis connection when server closes
  fastify.addHook('onClose', async (instance) => {
    fastify.log.info('Closing Redis connection');
    await instance.redis.quit();
  });
};

// Add TypeScript type definitions
declare module 'fastify' {
  interface FastifyInstance {
    redis: RedisClientType;
  }
}

export default fastifyPlugin(redisPlugin, { name: 'redis' });
