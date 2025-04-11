---
description: 
globs: 
alwaysApply: true
---
# AI Agent Rules (for agent-initiated code generation)

## AI-driven Workflow
- All adaptation logic (deload, progression) must be routed through AI suggestions.
- Do not hardcode progression rules.
- Always use `generateProgressionSuggestions()` + `updateTrainingPlan()`.

## gRPC Conventions
- All backend logic must be exposed via `.proto` + Fastify handler.
- Use `ts-proto` for generation. Do not manually type responses.

## Frontend Integration
- Use `grpcClient.ts` for all calls, never call gRPC directly from screens.
- React Native screens must read state from `useTraining()` and `useAuth()`.

## Development Strategy
- Always analyze the repo structure before making changes.
- Think in stages: proto → handler → service → client → screen.
- Prefer atomic commits with descriptive messages.