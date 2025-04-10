# Fitness AI Mobile App

React Native mobile application for the Fitness AI training system. This app allows users to view and manage their workout plans, track progress, and get AI-generated training suggestions.

## Features

- User authentication (login/logout)
- View and manage training plans
- Track workout sessions
- Submit session feedback
- Get AI-generated training suggestions

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation
- NativeWind (Tailwind CSS for React Native)
- gRPC-Web for API communication
- Zustand for state management

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Android Studio / Xcode for emulators
- Optional: Physical device for testing

### Installation

1. Install dependencies:

```bash
cd mobile
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration.

### Running in Development

#### Using Expo

Start the development server:

```bash
npm start
```

This will open the Expo developer tools. You can:
- Press 'a' to open on Android emulator
- Press 'i' to open on iOS simulator
- Scan the QR code with Expo Go on your physical device

#### Using Docker

From the project root directory:

```bash
docker-compose up mobile
```

### Building for Production

#### Android

```bash
npm run android:build
```

#### iOS

```bash
npm run ios:build
```

## Project Structure

```
mobile/
├── src/
│   ├── App.tsx              # Entry point for the app
│   ├── navigation/          # Navigation setup
│   │   └── index.tsx        # Main navigator
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx   # Home screen
│   │   └── ProfileScreen.tsx # Profile screen
│   ├── services/            # API services
│   │   └── grpcClient.ts    # gRPC client
│   ├── context/             # Context providers
│   │   └── AuthContext.tsx  # Authentication context
│   ├── components/          # Reusable components
│   └── config/              # Configuration
│       └── env.ts           # Environment config
├── assets/                  # App assets
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── tsconfig.json            # TypeScript configuration
├── babel.config.js          # Babel configuration
├── metro.config.js          # Metro bundler configuration
└── package.json             # Dependencies
```

## Connecting to the Backend

This app is configured to connect to a gRPC backend. By default, it will try to connect to `http://localhost:8080`, but you can customize this by setting the `GRPC_ENDPOINT` environment variable in your `.env` file.

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/my-feature`
4. Submit a pull request