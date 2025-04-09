# Fitness AI App

A comprehensive fitness application with AI-powered training guidance, featuring:

- Mobile app (React Native)
- Web dashboard (Next.js)
- Backend server (Node.js/Fastify with gRPC)

## Project Structure

- `/mobile` - React Native mobile application
- `/web` - Next.js web application
- `/server` - Fastify backend with gRPC and OpenAI integration
- `/proto` - Protocol Buffer definitions for gRPC services

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Mobile development environment for React Native
- Docker (for containerized deployment)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/fitness-ai-app.git
   cd fitness-ai-app
   ```

2. Install server dependencies
   ```
   cd server
   npm install
   ```

3. Set up the database
   ```
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. Install web dependencies
   ```
   cd ../web
   npm install
   ```

5. Install mobile dependencies
   ```
   cd ../mobile
   npm install
   ```

### Development

#### Server
```
cd server
npm run dev
```

#### Web
```
cd web
npm run dev
```

#### Mobile
```
cd mobile
npm run start
```

## Environment Setup

Create `.env` files in each directory following the `.env.example` templates.

## License

This project is licensed under the ISC License.