# Fitness AI Mobile App

Este es el cliente móvil para la aplicación de entrenamiento personalizado con IA.

## Requisitos

- Node.js >= 14
- React Native CLI
- Cocoapods (para iOS)
- Android Studio (para Android)
- Xcode (para iOS)

## Instalación

```bash
# Instalar dependencias
npm install

# Para iOS
cd ios && pod install && cd ..

# Para Android
# No se requieren pasos adicionales
```

## Ejecución

```bash
# iOS
npm run ios

# Android
npm run android
```

## Estructura del Proyecto

```
mobile/
├── android/          # Configuración específica de Android
├── ios/              # Configuración específica de iOS
├── src/              # Código fuente
│   ├── api/          # Clientes gRPC y API
│   ├── components/   # Componentes reutilizables
│   ├── screens/      # Pantallas de la aplicación
│   ├── navigation/   # Configuración de navegación
│   ├── store/        # Estado global (Redux o similar)
│   ├── theme/        # Estilos y tema
│   └── utils/        # Utilidades y helpers
└── App.tsx           # Punto de entrada
```

## Configuración de gRPC

Para trabajar con gRPC en React Native, utilizaremos la librería `@grpc/grpc-js` en combinación con un proxy web para la comunicación desde el dispositivo móvil.

### Ejemplos de llamadas gRPC

#### Autenticación de Usuario

```typescript
// src/api/auth.ts
import { credentials } from '@grpc/grpc-js';
import { UserServiceClient } from '../generated/fitness_grpc_pb';
import { LoginRequest } from '../generated/fitness_pb';

// Crear cliente gRPC
const client = new UserServiceClient(
  'your-server-address:50051',
  credentials.createInsecure()
);

export const login = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const request = new LoginRequest();
    request.setEmail(email);
    request.setPassword(password);

    client.authenticateUser(request, (err, response) => {
      if (err) {
        reject(err);
        return;
      }

      const token = response.getToken();
      const user = response.getUser();

      resolve({
        token,
        user: {
          id: user.getId(),
          email: user.getEmail(),
          firstName: user.getFirstName(),
          lastName: user.getLastName(),
        }
      });
    });
  });
};
```

#### Obtener Perfil de Usuario

```typescript
// src/api/user.ts
import { credentials } from '@grpc/grpc-js';
import { UserServiceClient } from '../generated/fitness_grpc_pb';
import { UserIdRequest } from '../generated/fitness_pb';

// Crear cliente gRPC
const client = new UserServiceClient(
  'your-server-address:50051',
  credentials.createInsecure()
);

export const getUserProfile = (userId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const request = new UserIdRequest();
    request.setUserId(userId);

    client.getUserProfile(request, (err, response) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        id: response.getId(),
        email: response.getEmail(),
        firstName: response.getFirstName(),
        lastName: response.getLastName(),
        profile: {
          age: response.getProfile()?.getAge(),
          weight: response.getProfile()?.getWeight(),
          height: response.getProfile()?.getHeight(),
          fitnessLevel: response.getProfile()?.getFitnessLevel(),
          fitnessGoals: response.getProfile()?.getFitnessGoalsList(),
          medicalIssues: response.getProfile()?.getMedicalIssuesList(),
          availableEquipment: response.getProfile()?.getAvailableEquipmentList(),
        }
      });
    });
  });
};
```

#### Generar Plan de Entrenamiento

```typescript
// src/api/training.ts
import { credentials } from '@grpc/grpc-js';
import { TrainingServiceClient } from '../generated/fitness_grpc_pb';
import { TrainingPlanRequest } from '../generated/fitness_pb';

// Crear cliente gRPC
const client = new TrainingServiceClient(
  'your-server-address:50051',
  credentials.createInsecure()
);

export const generateTrainingPlan = (params: {
  userId: string;
  name: string;
  description?: string;
  daysPerWeek: number;
  focusArea: string;
  sessionDuration: number;
  includeWarmup: boolean;
  includeCooldown: boolean;
}): Promise<any> => {
  return new Promise((resolve, reject) => {
    const request = new TrainingPlanRequest();
    request.setUserId(params.userId);
    request.setName(params.name);
    request.setDescription(params.description || '');
    request.setDaysPerWeek(params.daysPerWeek);
    request.setFocusArea(params.focusArea);
    request.setSessionDuration(params.sessionDuration);
    request.setIncludeWarmup(params.includeWarmup);
    request.setIncludeCooldown(params.includeCooldown);

    client.generateTrainingPlan(request, (err, response) => {
      if (err) {
        reject(err);
        return;
      }

      const exercises = response.getExercisesList().map(exercise => ({
        id: exercise.getId(),
        name: exercise.getName(),
        description: exercise.getDescription(),
        sets: exercise.getSets(),
        reps: exercise.getReps(),
        restTime: exercise.getRestTime(),
        notes: exercise.getNotes(),
        dayOfWeek: exercise.getDayOfWeek(),
        order: exercise.getOrder()
      }));

      resolve({
        id: response.getId(),
        userId: response.getUserId(),
        name: response.getName(),
        description: response.getDescription(),
        createdAt: response.getCreatedAt(),
        updatedAt: response.getUpdatedAt(),
        isActive: response.getIsActive(),
        generatedBy: response.getGeneratedBy(),
        exercises
      });
    });
  });
};
```

## Generación de Código gRPC para TypeScript

Para generar el código TypeScript a partir de las definiciones proto:

```bash
# Instalación de herramientas
npm install -g grpc-tools
npm install -g protoc-gen-ts

# Generación de código
mkdir -p src/generated
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=service=grpc-node:./src/generated \
  --js_out=import_style=commonjs,binary:./src/generated \
  --grpc_out=grpc_js:./src/generated \
  ../proto/services.proto
```

## Notas Importantes

- Para entornos de producción, debes usar credenciales seguras (TLS/SSL) en lugar de `credentials.createInsecure()`.
- Puedes usar servicios como Envoy o grpc-web para facilitar la comunicación gRPC desde dispositivos móviles.