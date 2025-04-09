import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { PrismaClient } from '../../generated/prisma';
import { config } from '../config/index';

// Import domain handlers
import createUserServiceHandler from '../domain/grpc/user/userHandler';
// Other domain handlers will be imported similarly as they're implemented
// import createTrainingServiceHandler from '../domain/grpc/training/trainingHandler';
// import createAIServiceHandler from '../domain/grpc/ai/aiHandler';

interface GrpcServiceDependencies {
  prisma: PrismaClient;
  jwtSecret: string;
  tokenExpiryTime: number;
}

/**
 * Initialize gRPC server with all services
 */
export function initGrpcServer({
  prisma,
  jwtSecret,
  tokenExpiryTime,
}: GrpcServiceDependencies) {
  const server = new grpc.Server();

  // Define the proto file paths
  const PROTO_DIR = path.join(__dirname, '../../../proto');

  // Load individual service proto files
  const userProtoPath = path.join(PROTO_DIR, 'user/user.proto');
  const trainingProtoPath = path.join(PROTO_DIR, 'training/training.proto');
  const aiProtoPath = path.join(PROTO_DIR, 'ai/ai.proto');

  // Load the user service
  const userPackageDefinition = protoLoader.loadSync(userProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const userProto = grpc.loadPackageDefinition(userPackageDefinition)
    .user as any;

  // Create user service handler with dependencies
  const userHandler = createUserServiceHandler({
    prisma,
    jwtSecret,
    tokenExpiryTime,
  });

  // Add user service to server
  server.addService(userProto.UserService.service, userHandler);

  // Training service will be loaded similarly
  /*
  const trainingPackageDefinition = protoLoader.loadSync(trainingProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const trainingProto = grpc.loadPackageDefinition(trainingPackageDefinition).training as any;

  const trainingHandler = createTrainingServiceHandler({
    prisma,
  });

  server.addService(trainingProto.TrainingService.service, trainingHandler);
  */

  // AI service will be loaded similarly
  /*
  const aiPackageDefinition = protoLoader.loadSync(aiProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const aiProto = grpc.loadPackageDefinition(aiPackageDefinition).ai as any;

  const aiHandler = createAIServiceHandler({
    prisma,
    openai: openaiClient,
  });

  server.addService(aiProto.AIService.service, aiHandler);
  */

  return server;
}

/**
 * Start the gRPC server on the specified port
 */
export function startGrpcServer(
  server: grpc.Server,
  port: number
): Promise<void> {
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
        console.log(`gRPC server started on port ${actualPort}`);
        resolve();
      }
    );
  });
}

/**
 * Initialize and start the gRPC server with all services
 */
export async function setupGrpcServer(
  prisma: PrismaClient
): Promise<grpc.Server> {
  const server = initGrpcServer({
    prisma,
    jwtSecret: config.jwt.secret,
    tokenExpiryTime: parseInt(config.jwt.expiresIn, 10),
  });

  await startGrpcServer(server, config.grpc.port);

  return server;
}
