import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../../../services/auth'; // Uncommented and path verified
import {
  LoginRequestSchema,
  LoginRequest,
  RegisterRequestSchema,
  RegisterRequest,
  UserResponse,
} from '@shared-types/user'; // Added Register types
import { z } from 'zod'; // Import Zod

// Define schema for refresh token request body inline
const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});
type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

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

  // Registration route
  fastify.post(
    '/register',
    {
      schema: {
        body: RegisterRequestSchema,
        // TODO: Define response schema (e.g., UserResponseSchema or a specific registration success schema)
      },
    },
    async (
      request: FastifyRequest<{ Body: RegisterRequest }>,
      reply: FastifyReply
    ) => {
      try {
        const result: UserResponse = await authService.register(request.body);
        return reply.status(201).send(result); // 201 Created for successful registration
      } catch (error: any) {
        // Example: Handle specific error for user already existing
        if (error.message === 'User already exists') {
          // This error message depends on AuthService implementation
          return reply.status(409).send({
            error: 'ConflictError',
            message: 'A user with this email already exists',
          });
        }
        request.log.error(error, 'Registration endpoint error');
        return reply.status(500).send({
          error: 'InternalServerError',
          message: 'An unexpected error occurred during registration',
        });
      }
    }
  );

  // Token refresh route
  fastify.post(
    '/refresh-token',
    {
      schema: {
        body: RefreshTokenRequestSchema,
        // TODO: Define response schema (e.g., { accessToken: string })
      },
    },
    async (
      request: FastifyRequest<{ Body: RefreshTokenRequest }>,
      reply: FastifyReply
    ) => {
      try {
        const { refreshToken } = request.body;
        const result = await authService.refreshToken(refreshToken);
        return reply.status(200).send(result); // Sends { accessToken: string }
      } catch (error: any) {
        if (error.message === 'Invalid refresh token') {
          // This error message depends on AuthService implementation
          return reply.status(401).send({
            error: 'UnauthorizedError',
            message: 'Invalid or expired refresh token',
          });
        }
        request.log.error(error, 'Token refresh endpoint error');
        return reply.status(500).send({
          error: 'InternalServerError',
          message: 'An unexpected error occurred during token refresh',
        });
      }
    }
  );
}
