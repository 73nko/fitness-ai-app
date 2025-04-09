import { FastifyPluginAsync } from 'fastify';
// import userRoutes from '../domain/users/routes';
// import trainingRoutes from '../domain/trainings/routes';
import aiRoutes from '../domain/ai/routes';

const api: FastifyPluginAsync = async (fastify, options) => {
  // Health check route
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Register domain routes
  // fastify.register(userRoutes, { prefix: '/users' });
  // fastify.register(trainingRoutes, { prefix: '/trainings' });
  fastify.register(aiRoutes, { prefix: '/ai' });
};

export default api;
