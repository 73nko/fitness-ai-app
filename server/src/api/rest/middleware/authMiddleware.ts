import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

// Define a more specific type for the user payload if possible, based on JwtPayload
interface AuthenticatedUser {
  id: string; // Mapped from userId
  email: string;
  iat?: number;
  exp?: number;
  // Add other fields from JwtPayload if they exist and are needed
}

// Extend FastifyRequest to include the user property
declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthenticatedUser;
  }
}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  try {
    // Access jwt utilities via request.server.jwt
    const token = request.server.jwt.extractToken(request);

    if (!token) {
      reply
        .code(401)
        .send({ error: 'Unauthorized', message: 'No token provided' });
      return; // Important to return after sending reply
    }

    // JwtPayload from jwt.ts is { userId: string, email: string, iat?: number, exp?: number }
    const decodedPayload = request.server.jwt.verify(token);

    // Map JwtPayload to AuthenticatedUser structure for request.user
    const { userId, ...restOfDecoded } = decodedPayload;
    request.user = {
      id: userId,
      email: restOfDecoded.email, // email is part of restOfDecoded here
      // Optional claims, ensure they are part of restOfDecoded if accessed
      ...(restOfDecoded.iat && { iat: restOfDecoded.iat }),
      ...(restOfDecoded.exp && { exp: restOfDecoded.exp }),
      // If there are other custom claims in JwtPayload that should be on request.user, add them here
    };

    done(); // Proceed to the next handler or route
  } catch (err: any) {
    request.log.warn({ err }, 'Authentication error in middleware');
    // If token is invalid (e.g., expired, malformed)
    reply
      .code(401)
      .send({ error: 'Unauthorized', message: err.message || 'Invalid token' });
    // No call to done() here as we've handled the request by sending a reply
  }
}
