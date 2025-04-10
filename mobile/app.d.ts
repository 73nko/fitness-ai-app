// TypeScript declarations for third-party libraries

// react-native-config - Environment variables
declare module 'react-native-config' {
  interface ConfigInterface {
    GRPC_ENDPOINT?: string;
    API_KEY?: string;
    APP_ENV?: string;
    DEBUG_MODE?: string;
    ENABLE_ANALYTICS?: string;
    [key: string]: string | undefined;
  }
  const Config: ConfigInterface;
  export default Config;
}

// @improbable-eng/grpc-web (simplified declaration)
declare module '@improbable-eng/grpc-web' {
  export namespace grpc {
    export interface Metadata {
      [key: string]: string;
    }
  }
}
