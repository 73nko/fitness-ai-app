---
description: 
globs: *.proto,server/**/*.ts
alwaysApply: false
---
# File-Aware Rules (auto-detected context)

## For .proto or Fastify handlers
- Each gRPC method must be:
  1. Defined in proto
  2. Generated via ts-proto
  3. Implemented in a Fastify handler
  4. Linked in service/router file

## For mobile/screens
- Screens go under `screens/`
- Only fetch data through context or injected services
- Do not use `useEffect` for gRPC fetch. Use `useCallback + lifecycle`.

## For services/grpcClient.ts
- All gRPC functions return typed Promise<T>
- Always map proto types to frontend models
- Include error handling and token injection (`this.authToken`)