import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import * as grpc from '@grpc/grpc-js';
import { config } from '../config/index';

// Plugin options (if needed)
interface GrpcServerPluginOptions {
  // Add any plugin-specific options here
}

const grpcServerPlugin: FastifyPluginAsync<GrpcServerPluginOptions> = async (
  fastify,
  options
) => {
  // Initialize gRPC server
  const server = new grpc.Server();

  // Decorate Fastify instance with gRPC server
  fastify.decorate('grpc', {
    server: server,
  });

  // Start gRPC server on boot
  fastify.addHook('onReady', async () => {
    await startGrpcServer(server, config.grpc.port);
    fastify.log.info(`gRPC server started on port ${config.grpc.port}`);
  });

  // Shutdown gRPC server when Fastify closes
  fastify.addHook('onClose', async (instance) => {
    await new Promise<void>((resolve) => {
      (instance.grpc.server as grpc.Server).tryShutdown(() => {
        fastify.log.info('gRPC server shut down');
        resolve();
      });
    });
  });
};

/**
 * Start the gRPC server on the specified port
 */
function startGrpcServer(server: grpc.Server, port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, actualPort) => {
        if (err) {
          reject(err);
          return;
        }

        server.start();
        resolve();
      }
    );
  });
}

// Add TypeScript type definitions
declare module 'fastify' {
  interface FastifyInstance {
    grpc: {
      server: grpc.Server;
    };
  }
}

export default fastifyPlugin(grpcServerPlugin, {
  name: 'grpc-server',
  dependencies: ['db', 'openai'],
});
