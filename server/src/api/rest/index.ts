import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

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

  // Register routes (placeholders for now)
  // app.register(trainingRoutes, { prefix: '/api/training' });
  // app.register(userRoutes, { prefix: '/api/user' });
  // app.register(authRoutes, { prefix: '/api/auth' });

  // Basic request logging (can be expanded in a later subtask)
  app.addHook('onRequest', (request, reply, done) => {
    request.log.info({ req: request.raw }, 'incoming request');
    done();
  });

  app.addHook('onResponse', (request, reply, done) => {
    request.log.info(
      { res: reply.raw, rtt: reply.getResponseTime() },
      'request completed'
    );
    done();
  });

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
    'REST API setup complete with CORS, basic logging, and error handling.'
  );
}
