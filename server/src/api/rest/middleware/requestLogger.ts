import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export function customRequestLogger(app: FastifyInstance) {
  app.addHook(
    'onRequest',
    (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const logData = {
        reqId: request.id,
        method: request.method,
        url: request.url,
        ip: request.ip,
        // TODO: Add more sophisticated request logging here,
        // Headers can be verbose, log selectively or a summary if needed
        // For example, to log specific headers:
        // userAgent: request.headers['user-agent'],
        headers: request.headers, // Logging all headers for now, consider redacting sensitive ones
      };
      request.log.info({ req: logData }, 'Incoming request details');
      done();
    }
  );

  app.addHook(
    'onResponse',
    (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const logData = {
        reqId: request.id,
        url: request.url,
        statusCode: reply.statusCode,
        responseTime: reply.getResponseTime(), // in milliseconds
      };
      request.log.info({ res: logData }, 'Request completed details');
      done();
    }
  );

  app.log.info('Custom request logger registered.');
}
