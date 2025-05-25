import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../../../services/user'; // Uncommented
import { authMiddleware } from '../middleware/authMiddleware'; // Uncommented
// import { UpdateProfileRequestSchema, UpdateProfileRequest } from '@shared-types/user'; // Placeholder for later use

export async function userRoutes(fastify: FastifyInstance): Promise<void> {
  const userService = new UserService(); // Uncommented

  fastify.get(
    '/profile',
    {
      onRequest: [authMiddleware], // Apply auth middleware
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = request.user?.id; // Access user from authenticated request
        if (!userId) {
          // This case should ideally be handled by authMiddleware, but good for type safety
          return reply
            .status(401)
            .send({ error: 'Unauthorized', message: 'User not authenticated' });
        }

        const profile = await userService.getUserProfile(userId);

        if (!profile) {
          return reply.status(404).send({
            error: 'NotFound',
            message: 'User profile not found',
          });
        }

        return reply.status(200).send(profile);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          error: 'InternalServerError',
          message: 'Failed to retrieve user profile',
        });
      }
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
