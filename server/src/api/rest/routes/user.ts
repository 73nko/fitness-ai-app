import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
// import { UserService } from '../../../services/user'; // Placeholder, will be created in subtask 4.2
// import { authMiddleware } from '../middleware/authMiddleware'; // Placeholder for auth middleware
// import { UpdateProfileRequestSchema, UpdateProfileRequest } from '@shared-types/user'; // Placeholder for later use

export async function userRoutes(fastify: FastifyInstance): Promise<void> {
  // const userService = new UserService(); // Placeholder

  fastify.get(
    '/profile',
    {
      // onRequest: [authMiddleware] // Placeholder: Apply auth middleware in subtask 4.3/4.5
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      // const userId = request.user?.id;
      // if (!userId) return reply.status(401).send({ error: 'Unauthorized' });
      // const profile = await userService.getUserProfile(userId);
      // if (!profile) return reply.status(404).send({ error: 'Not Found', message: 'Profile not found' });
      // return reply.send(profile);
      return reply.send({ message: 'GET /profile placeholder' });
    }
  );

  fastify.put(
    '/profile',
    {
      // schema: { body: UpdateProfileRequestSchema }, // Placeholder for subtask 4.4
      // onRequest: [authMiddleware] // Placeholder: Apply auth middleware in subtask 4.4/4.5
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      // const userId = request.user?.id;
      // if (!userId) return reply.status(401).send({ error: 'Unauthorized' });
      // const updatedProfile = await userService.updateProfile(userId, request.body as UpdateProfileRequest);
      // return reply.send(updatedProfile);
      return reply.send({ message: 'PUT /profile placeholder' });
    }
  );

  fastify.log.info('User routes registered');
}
