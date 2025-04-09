import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import jwt from 'jsonwebtoken';

interface JwtPluginOptions {
  // Plugin options if needed
}

interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

interface JwtUtilities {
  sign: (payload: Omit<JwtPayload, 'iat' | 'exp'>) => string;
  verify: (token: string) => JwtPayload;
  extractToken: (request: FastifyRequest) => string | null;
}

const jwtPlugin: FastifyPluginAsync<JwtPluginOptions> = async (
  fastify,
  options
) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRY || '24h';

  if (!secret) {
    fastify.log.error('JWT_SECRET not found in environment variables');
    throw new Error('JWT_SECRET is required');
  }

  const jwtUtilities: JwtUtilities = {
    sign: (payload) => {
      return jwt.sign(payload, secret, { expiresIn } as any);
    },
    verify: (token) => {
      return jwt.verify(token, secret) as JwtPayload;
    },
    extractToken: (request) => {
      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
      }
      return null;
    },
  };

  // Make JWT utilities available through fastify.jwt
  fastify.decorate('jwt', jwtUtilities);

  // Log JWT setup
  fastify.log.info('JWT plugin registered');
};

// Add TypeScript type definitions
declare module 'fastify' {
  interface FastifyInstance {
    jwt: JwtUtilities;
  }
}

export default fastifyPlugin(jwtPlugin, { name: 'jwt' });
