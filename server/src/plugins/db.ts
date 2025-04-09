import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { PrismaClient } from '../../generated/prisma';

interface DbPluginOptions {
  // Plugin options if needed
}

const dbPlugin: FastifyPluginAsync<DbPluginOptions> = async (
  fastify,
  options
) => {
  const prisma = new PrismaClient();

  // Test connection
  try {
    await prisma.$connect();
    fastify.log.info('Connected to PostgreSQL database');
  } catch (error) {
    fastify.log.error('Failed to connect to PostgreSQL database', error);
    throw error;
  }

  // Make Prisma available through fastify.prisma
  fastify.decorate('prisma', prisma);

  // Close database connection when server closes
  fastify.addHook('onClose', async (instance) => {
    fastify.log.info('Closing PostgreSQL connection');
    await instance.prisma.$disconnect();
  });
};

// Add TypeScript type definitions
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export default fastifyPlugin(dbPlugin, { name: 'db' });
