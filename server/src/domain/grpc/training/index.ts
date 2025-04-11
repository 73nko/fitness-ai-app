import { FastifyPluginAsync } from 'fastify';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { trainingHandler } from './trainingHandler';

// Define the file path for the proto file
const PROTO_PATH = path.resolve(
  __dirname,
  '../../../../proto/training/training.proto'
);

const trainingPlugin: FastifyPluginAsync = async (fastify) => {
  // Load the proto file
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  // Load the gRPC service definition
  const serviceProto = grpc.loadPackageDefinition(packageDefinition).training;

  // Register the training service with the gRPC server
  fastify.grpc.server.addService(
    (serviceProto as any).TrainingService.service,
    trainingHandler
  );

  fastify.log.info('Training gRPC service registered');
};

export default trainingPlugin;
