import { grpc } from '@improbable-eng/grpc-web';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import env from '../config/env';

// Register the NodeHttpTransport for React Native compatibility
grpc.setDefaultTransport(NodeHttpTransport());

/**
 * Error response structure for gRPC calls
 */
export interface GrpcError {
  code: grpc.Code;
  message: string;
  metadata?: grpc.Metadata;
}

/**
 * Type for gRPC method similar to what would be generated
 */
export interface GrpcMethodDefinition<TRequest, TResponse> {
  methodName: string;
  service: {
    serviceName: string;
  };
  requestStream: boolean;
  responseStream: boolean;
  requestType: {
    new (): TRequest;
    encode: (message: TRequest, writer?: any) => any;
  };
  responseType: {
    new (): TResponse;
    decode: (reader: any, length?: number) => TResponse;
  };
}

/**
 * Generic function to make unary gRPC calls
 *
 * @param method - The gRPC method definition
 * @param request - The request object of type TRequest
 * @param token - Optional authentication token
 * @returns Promise resolving to TResponse or rejecting with GrpcError
 */
export function callUnary<TRequest, TResponse>(
  method: GrpcMethodDefinition<TRequest, TResponse>,
  request: TRequest,
  token?: string
): Promise<TResponse> {
  return new Promise<TResponse>((resolve, reject) => {
    const metadata = new grpc.Metadata();

    // Add authorization token if provided
    if (token) {
      metadata.set('Authorization', `Bearer ${token}`);
    }

    // Use type assertion to satisfy the constraints
    const grpcMethod = method as unknown as grpc.UnaryMethodDefinition<
      grpc.ProtobufMessage,
      grpc.ProtobufMessage
    >;
    const grpcRequest = request as unknown as grpc.ProtobufMessage;

    grpc.unary(grpcMethod, {
      request: grpcRequest,
      host: env.GRPC_ENDPOINT,
      metadata,
      onEnd: (response) => {
        const { status, statusMessage, message } = response;

        if (status === grpc.Code.OK && message) {
          resolve(message as unknown as TResponse);
        } else {
          const error: GrpcError = {
            code: status,
            message: statusMessage || 'Unknown gRPC error',
            metadata: response.trailers,
          };
          reject(error);
        }
      },
    });
  });
}
