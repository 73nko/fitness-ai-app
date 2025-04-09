import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import path from 'path';
import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { aiHandler } from './aiHandler';
import OpenAI from 'openai';

// Define opciones de carga para gRPC
const protoLoaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const aiPlugin: FastifyPluginAsync = async (fastify) => {
  try {
    // Path al archivo proto
    const protoPath = path.join(process.cwd(), 'proto/ai/ai.proto');

    // Cargar el proto
    const packageDefinition = loadSync(protoPath, protoLoaderOptions);
    const proto = loadPackageDefinition(packageDefinition);

    // Crear cliente OpenAI
    const openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Crear el handler con dependencias
    const aiServiceHandler = aiHandler({
      prisma: fastify.prisma,
      openai: openaiClient,
      log: console,
    });

    // Registrar el servicio AI en el servidor gRPC
    fastify.grpc.server.addService(
      // @ts-ignore - Los tipos generados pueden no estar disponibles aún
      proto.ai.AIService.service,
      aiServiceHandler as any
    );

    fastify.log.info('AI gRPC service registered');
  } catch (error) {
    fastify.log.error('Failed to register AI gRPC service:', error);
    throw error;
  }
};

export default fp(aiPlugin, {
  name: 'ai-grpc-service',
  dependencies: ['grpc-server', 'openai', 'db'],
});
