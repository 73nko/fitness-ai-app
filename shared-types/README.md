# Shared Types for Fitness AI App

This package provides a centralized location for Zod schemas and TypeScript type definitions shared between the backend (Fastify server) and frontend (mobile/web) applications of the Fitness AI App. The goal is to ensure type safety and consistency across the entire application, especially during the migration from gRPC to a REST API.

## Overview

- **Zod Schemas**: Used for runtime validation of data, particularly for API request and response bodies on the server.
- **TypeScript Types**: Automatically inferred from Zod schemas, providing static type checking during development for both backend and frontend.

All types and schemas are generated based on the message definitions in the `.proto` files (`user.proto`, `training.proto`, `ai.proto`) to ensure alignment with the existing data structures.

## Structure

Schemas and types are organized by domain into the following files within the `src/` directory:

- `src/user.ts`: Contains schemas and types related to user management, authentication, and profiles.
- `src/training.ts`: Contains schemas and types related to training plans, exercises, workout recording, and progression.
- `src/ai.ts`: Contains schemas and types related to AI-generated content, feedback, recommendations, and analysis.

All schemas and types are exported from `src/index.ts` for easy importing.

## Installation & Setup

This package (`shared-types`) is intended to be used as a local package within the `fitness-ai-app` project.

1.  **Dependencies**:
    This package depends on `zod` for schema definition and validation, and `typescript`.
    These are already listed in `shared-types/package.json`.

2.  **Building (Optional for local use)**:
    The `tsconfig.json` is configured to output compiled JavaScript and declaration files (`.d.ts`) to a `dist/` directory. You can compile the types by running `npx tsc` within the `shared-types` directory if you need to publish this package or use the compiled output directly. For local path-based imports (e.g., `import { ... } from '../shared-types/src'`), direct compilation might not be strictly necessary if your main project's TypeScript setup can resolve and transpile these files.

## Usage

### Importing Schemas and Types

You can import schemas and their inferred TypeScript types directly from the `shared-types/src` entry point (or from the compiled `dist` if you set up path aliases or module resolution accordingly).

```typescript
// Example in a server-side Fastify route handler
import { UserProfileSchema, UserProfile } from '../../shared-types/src'; // Adjust path as needed

// ... inside your handler

// Validate incoming request data (example)
let validatedProfile: UserProfile;
try {
  validatedProfile = UserProfileSchema.parse(request.body);
} catch (error) {
  // Handle validation error (e.g., return 400 Bad Request)
  console.error(error.errors);
  // ...
}

// Use the validated and typed data
console.log(validatedProfile.userId);
```

```typescript
// Example in a frontend component or service
import { TrainingPlan, TrainingPlanSchema } from '../../../shared-types/src'; // Adjust path as needed

async function fetchTrainingPlan(userId: string): Promise<TrainingPlan | null> {
  const response = await fetch(`/api/user/${userId}/training-plan`);
  if (!response.ok) {
    // Handle error
    return null;
  }
  const data = await response.json();

  // Optionally, validate response data on the client too (for robustness)
  try {
    const validatedPlan = TrainingPlanSchema.parse(data);
    return validatedPlan;
  } catch (error) {
    console.error("Invalid training plan data received from server:", error.errors);
    return null;
  }
}
```

### Key Concepts

-   **Schema First**: Zod schemas are the source of truth for data structures.
-   **Type Inference**: TypeScript types are automatically inferred using `z.infer<typeof YourSchema>`. This means you only define the structure once (in Zod) and get both runtime validation and static types.

    ```typescript
    import { z } from 'zod';

    export const MyObjectSchema = z.object({
      id: z.string(),
      value: z.number(),
    });

    export type MyObject = z.infer<typeof MyObjectSchema>;
    // MyObject is now { id: string; value: number; }
    ```

## Best Practices

1.  **Server-Side Validation**: Always use the Zod schemas to validate incoming request bodies and parameters on the server before processing them. This is crucial for security and data integrity.
2.  **Type Consistency**: Utilize the exported TypeScript types in both your backend (Fastify route handlers, services) and frontend (React Native/React components, API clients) to ensure data consistency and catch type errors at compile time.
3.  **Centralized Updates**: If a data structure needs to change, update the corresponding Zod schema in this `shared-types` package first. The TypeScript types will update automatically. Then, address any resulting type errors in the consuming backend and frontend code.
4.  **Proto Alignment**: These schemas were initially generated based on `.proto` files. As you evolve the REST API, if changes deviate significantly from the original proto structures, ensure these shared types accurately reflect the new REST API contracts.
5.  **Naming Conventions**: Schema names generally follow the pattern `ProtoMessageNameSchema` (e.g., `UserProfileSchema`). TypeScript types are named `ProtoMessageName` (e.g., `UserProfile`). Where potential naming conflicts exist (e.g., `TrainingPlan` in `ai.proto` vs. `training.proto`), schemas/types from one domain might be prefixed (e.g., `AiTrainingPlanSchema`).

## Contributing

When adding or modifying types:

1.  Identify the relevant domain file (`user.ts`, `training.ts`, `ai.ts`) or create a new one if a new domain is introduced.
2.  Define a Zod schema for the data structure.
3.  Export the schema.
4.  Infer and export the TypeScript type from the schema.
5.  Re-export the new schemas and types from `src/index.ts`.
6.  Consider if documentation in this README or specific JSDoc comments for the types/schemas needs updating.