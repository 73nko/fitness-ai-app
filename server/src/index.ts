import { fastify } from 'fastify';
import dotenv from 'dotenv';
import { PrismaClient } from '../generated/prisma';

// Load environment variables
dotenv.config();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Initialize Fastify with options
const server = fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register plugins
async function registerPlugins() {
  // Register database plugin
  const dbPlugin = await import('./plugins/db');
  await server.register(dbPlugin.default);

  // Register redis plugin if needed
  const redisPlugin = await import('./plugins/redis');
  await server.register(redisPlugin.default);

  // Register OpenAI plugin
  const openaiPlugin = await import('./plugins/openai');
  await server.register(openaiPlugin.default);

  // Register JWT plugin
  const jwtPlugin = await import('./plugins/jwt');
  await server.register(jwtPlugin.default);

  // Register API routes
  const apiRoutes = await import('./api/index');
  await server.register(apiRoutes.default, { prefix: '/api' });

  // Register gRPC server plugin
  const grpcServerPlugin = await import('./plugins/grpc-server');
  await server.register(grpcServerPlugin.default);

  // Register AI gRPC service
  const aiGrpcService = await import('./domain/grpc/ai');
  await server.register(aiGrpcService.default);

  // Register Training gRPC service
  const trainingGrpcService = await import('./domain/grpc/training');
  await server.register(trainingGrpcService.default);

  // Swagger documentation
  await server.register(require('@fastify/swagger'), {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Fitness AI API',
        description: 'API for fitness training generation with AI',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: `localhost:${process.env.PORT || 3000}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  });
}

// Start the server
async function start() {
  try {
    await registerPlugins();

    // Start HTTP server
    await server.listen({
      port: parseInt(process.env.PORT || '3000', 10),
      host: '0.0.0.0',
    });

    const address = server.server?.address();
    const port =
      typeof address === 'string' ? address : address?.port || '3000';

    server.log.info(`Server listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  server.log.error(err);
  process.exit(1);
});

// Start the server
start();
