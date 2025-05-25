import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../../../services/auth'; // Uncommented and path verified
import { LoginRequestSchema, LoginRequest } from '@shared-types/user'; // Using user-provided path

export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  const authService = new AuthService(); // Uncommented

  // Login route
  fastify.post(
    '/login',
    {
      schema: {
        body: LoginRequestSchema,
      },
    },
    async (
      request: FastifyRequest<{ Body: LoginRequest }>,
      reply: FastifyReply
    ) => {
      try {
        const { email, password } = request.body;
        const result = await authService.login(email, password); // Uncommented
        return reply.status(200).send(result); // Uncommented
      } catch (error: any) {
        if (error.message === 'Invalid credentials') {
          return reply.status(401).send({
            error: 'AuthenticationError',
            message: 'Invalid email or password',
          });
        }
        // Log the error for server-side inspection
        request.log.error(error, 'Login endpoint error');
        return reply.status(500).send({
          error: 'InternalServerError',
          message: 'An unexpected error occurred during login',
        });
      }
    }
  );

  // Registration route placeholder
  fastify.post('/register', async (request, reply) => {
    // Implementation to be added in a later subtask
    return reply.send({ message: 'Register endpoint placeholder' });
  });

  // Token refresh route placeholder
  fastify.post('/refresh-token', async (request, reply) => {
    // Implementation to be added in a later subtask
    return reply.send({ message: 'Token refresh endpoint placeholder' });
  });
}
