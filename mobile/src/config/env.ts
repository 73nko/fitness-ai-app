import Config from 'react-native-config';

interface EnvConfig {
  GRPC_ENDPOINT: string;
  API_KEY: string;
  APP_ENV: string;
  DEBUG_MODE: boolean;
  ENABLE_ANALYTICS: boolean;
}

// Default values in case .env file is missing
const defaultConfig: EnvConfig = {
  GRPC_ENDPOINT: 'http://localhost:8080',
  API_KEY: 'dev_key',
  APP_ENV: 'development',
  DEBUG_MODE: true,
  ENABLE_ANALYTICS: false,
};

// Convert string values from env to proper types
function parseEnv(): EnvConfig {
  return {
    GRPC_ENDPOINT: Config.GRPC_ENDPOINT || defaultConfig.GRPC_ENDPOINT,
    API_KEY: Config.API_KEY || defaultConfig.API_KEY,
    APP_ENV: Config.APP_ENV || defaultConfig.APP_ENV,
    DEBUG_MODE: Config.DEBUG_MODE === 'true' || defaultConfig.DEBUG_MODE,
    ENABLE_ANALYTICS:
      Config.ENABLE_ANALYTICS === 'true' || defaultConfig.ENABLE_ANALYTICS,
  };
}

// Export parsed environment variables
export const env = parseEnv();

// Helper function to check if we're in development mode
export function isDev(): boolean {
  return env.APP_ENV === 'development';
}

// Helper function to check if we're in production mode
export function isProd(): boolean {
  return env.APP_ENV === 'production';
}

// Helper function to check if debugging is enabled
export function isDebugEnabled(): boolean {
  return env.DEBUG_MODE;
}

export default env;
