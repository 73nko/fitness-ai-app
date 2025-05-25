import {
  FastifyInstance,
  FastifyError,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      request.log.error({ err: error }, 'Error occurred'); // Log the full error object

      // TODO: Add more sophisticated error handling here,
      // You can add more sophisticated error handling here,
      // for example, distinguishing between different error types
      // or formatting errors differently based on environment (dev vs. prod)

      const statusCode = error.statusCode || 500;
      const errorName = error.name || 'InternalServerError';
      const errorMessage = error.message || 'An unknown error occurred';

      // TODO: Add more sophisticated error handling here,
      // For production, you might want to avoid sending detailed error messages to the client
      // if (process.env.NODE_ENV === 'production' && statusCode === 500) {
      //   reply.status(statusCode).send({
      //     error: 'InternalServerError',
      //     message: 'An internal server error occurred. Please try again later.'
      //   });
      //   return;
      // }

      reply.status(statusCode).send({
        error: errorName,
        message: errorMessage,
        // Optionally include stack in development
        // TODO: Add more sophisticated error handling here,
        ...(process.env.NODE_ENV !== 'production' &&
          error.stack && { stack: error.stack }),
      });
    }
  );

  app.log.info('Custom error handler registered.');
}
