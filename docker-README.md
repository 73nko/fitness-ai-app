# Fitness AI App - Docker Setup

This repository contains Docker configurations for running the Fitness AI application, including the backend server, database, and caching services.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuration

1. Create a `.env` file based on the `.env.example` template:

```bash
cp .env.example .env
```

2. Modify the `.env` file with your own settings:
   - Set a secure `JWT_SECRET`
   - Add your `OPENAI_API_KEY`
   - Adjust other settings as needed

## Running the Application

### Start all services

```bash
docker-compose up -d
```

This command starts the following services:
- PostgreSQL database
- Redis cache
- Backend API server

### Start with development tools

To include Prisma Studio for database management:

```bash
docker-compose --profile dev up -d
```

Access Prisma Studio at http://localhost:5555

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
```

### Stop all services

```bash
docker-compose down
```

### Reset data (removes all volumes)

```bash
docker-compose down -v
```

## Service Endpoints

- **Backend API**: http://localhost:3000
- **gRPC Server**: localhost:50051
- **Prisma Studio**: http://localhost:5555 (when using dev profile)
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Development Workflow

1. Make changes to your code
2. Rebuild the affected service:
   ```bash
   docker-compose build server
   ```
3. Restart the service:
   ```bash
   docker-compose up -d --no-deps server
   ```

## Troubleshooting

### Database Connection Issues

If the server cannot connect to the database:

1. Ensure PostgreSQL is healthy:
   ```bash
   docker-compose ps postgres
   ```

2. Check PostgreSQL logs:
   ```bash
   docker-compose logs postgres
   ```

3. Verify the `DATABASE_URL` in the server service environment

### Server Startup Issues

If the server fails to start:

1. Check server logs:
   ```bash
   docker-compose logs server
   ```

2. Ensure Prisma migrations are applied:
   ```bash
   docker-compose exec server npx prisma migrate deploy
   ```

## Production Deployment Notes

For production deployment:

1. Use proper secrets management for sensitive data
2. Set appropriate resource limits for containers
3. Configure proper network security
4. Set `NODE_ENV=production` in your environment
5. Use a reverse proxy (like Nginx) for SSL termination