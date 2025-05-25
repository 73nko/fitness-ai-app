import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { customRequestLogger } from './middleware/requestLogger';

// Placeholder for future route imports
// import { trainingRoutes } from './routes/training';
// import { userRoutes } from './routes/user';
// import { authRoutes } from './routes/auth';

export function setupRestApi(app: FastifyInstance) {
  // Register plugins
  app.register(cors, {
    origin: true, // Configure this more strictly in a production environment
    credentials: true,
  });

  // Register custom request logger
  customRequestLogger(app);

  // Register routes (placeholders for now)
  // app.register(trainingRoutes, { prefix: '/api/training' });
  // app.register(userRoutes, { prefix: '/api/user' });
  // app.register(authRoutes, { prefix: '/api/auth' });

  // Error handler
  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    const statusCode = error.statusCode || 500;
    reply.status(statusCode).send({
      error: error.name || 'InternalServerError',
      message: error.message || 'An unknown error occurred',
    });
  });

  app.log.info(
    'REST API setup complete with CORS, custom logging, and error handling.'
  );
}
