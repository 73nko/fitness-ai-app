import * as grpc from '@grpc/grpc-js';

interface SendResponseOptions {
  callback: grpc.sendUnaryData<any>;
  data?: any;
  error?: {
    code: grpc.status;
    message: string;
  };
}

/**
 * Helper function to standardize gRPC responses
 */
export function sendResponse({
  callback,
  data,
  error,
}: SendResponseOptions): void {
  if (error) {
    callback({
      code: error.code,
      message: error.message,
    });
    return;
  }

  callback(null, data);
}
