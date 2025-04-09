import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import OpenAI from 'openai';

interface OpenAIPluginOptions {
  // Plugin options if needed
}

const openaiPlugin: FastifyPluginAsync<OpenAIPluginOptions> = async (
  fastify,
  options
) => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    fastify.log.warn(
      'OpenAI API key not found. AI functionality will not work properly.'
    );
  }

  // Create OpenAI client
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  // Make OpenAI client available through fastify.openai
  fastify.decorate('openai', openai);

  // Log OpenAI setup
  fastify.log.info('OpenAI plugin registered');
};

// Add TypeScript type definitions
declare module 'fastify' {
  interface FastifyInstance {
    openai: OpenAI;
  }
}

export default fastifyPlugin(openaiPlugin, { name: 'openai' });
