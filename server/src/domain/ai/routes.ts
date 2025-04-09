import { FastifyPluginAsync } from 'fastify';
import { generateTrainingPlan } from './controller';

interface GenerateTrainingRequest {
  userId: string;
  name: string;
  description?: string;
  daysPerWeek: number;
  focusArea: string;
  sessionDuration: number;
  includeWarmup: boolean;
  includeCooldown: boolean;
}

const aiRoutes: FastifyPluginAsync = async (fastify, options) => {
  // Generate training plan using OpenAI
  fastify.post<{ Body: GenerateTrainingRequest }>('/generate-training', {
    schema: {
      body: {
        type: 'object',
        required: [
          'userId',
          'name',
          'daysPerWeek',
          'focusArea',
          'sessionDuration',
        ],
        properties: {
          userId: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          daysPerWeek: { type: 'number', minimum: 1, maximum: 7 },
          focusArea: { type: 'string' },
          sessionDuration: { type: 'number', minimum: 15 },
          includeWarmup: { type: 'boolean', default: true },
          includeCooldown: { type: 'boolean', default: true },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            exercises: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  sets: { type: 'number' },
                  reps: { type: 'string' },
                  restTime: { type: 'number' },
                  dayOfWeek: { type: 'number' },
                  order: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const trainingPlan = await generateTrainingPlan(fastify, request.body);
        return trainingPlan;
      } catch (error) {
        request.log.error(error);
        reply.status(500).send({
          error: 'Failed to generate training plan',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    },
  });
};

export default aiRoutes;
