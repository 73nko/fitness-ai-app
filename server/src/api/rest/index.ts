import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { customRequestLogger } from './middleware/requestLogger';
import { registerErrorHandler } from './middleware/errorHandler';

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

  // Register custom error handler
  registerErrorHandler(app);

  app.log.info(
    'REST API setup complete with CORS, custom logging, and custom error handling.'
  );
}
