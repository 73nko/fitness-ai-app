#!/bin/bash

# Function to determine which docker compose command to use
get_docker_compose_cmd() {
    if command -v docker-compose &> /dev/null; then
        echo "docker-compose"
    else
        echo "docker compose"
    fi
}

# Store the appropriate docker compose command
DOCKER_COMPOSE=$(get_docker_compose_cmd)

# Function to display help message
show_help() {
    echo "Fitness AI App Docker Utilities"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start           Start all services"
    echo "  start-dev       Start all services including development tools"
    echo "  stop            Stop all services"
    echo "  restart         Restart all services"
    echo "  logs [service]  View logs (optional: specify service name)"
    echo "  ps              List running services"
    echo "  exec [service]  Execute a bash shell in a container"
    echo "  rebuild         Rebuild and restart services"
    echo "  db-studio       Start Prisma Studio"
    echo "  reset           Reset data (warning: removes all volumes)"
    echo "  help            Show this help message"
    echo ""
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Process commands
case "$1" in
    start)
        echo "Starting all services..."
        $DOCKER_COMPOSE up -d
        ;;
    start-dev)
        echo "Starting all services with development tools..."
        $DOCKER_COMPOSE --profile dev up -d
        ;;
    stop)
        echo "Stopping all services..."
        $DOCKER_COMPOSE down
        ;;
    restart)
        echo "Restarting all services..."
        $DOCKER_COMPOSE down
        $DOCKER_COMPOSE up -d
        ;;
    logs)
        if [ -z "$2" ]; then
            $DOCKER_COMPOSE logs -f
        else
            $DOCKER_COMPOSE logs -f "$2"
        fi
        ;;
    ps)
        $DOCKER_COMPOSE ps
        ;;
    exec)
        if [ -z "$2" ]; then
            echo "Error: Please specify a service name."
            echo "Usage: $0 exec [service]"
            exit 1
        else
            $DOCKER_COMPOSE exec "$2" bash || $DOCKER_COMPOSE exec "$2" sh
        fi
        ;;
    rebuild)
        echo "Rebuilding and restarting services..."
        $DOCKER_COMPOSE build
        $DOCKER_COMPOSE up -d
        ;;
    db-studio)
        echo "Starting Prisma Studio..."
        $DOCKER_COMPOSE --profile dev up -d prisma-studio
        echo "Prisma Studio is available at http://localhost:5555"
        ;;
    reset)
        echo "Warning: This will remove all data. Are you sure? (y/N)"
        read -r confirmation
        if [[ $confirmation =~ ^[Yy]$ ]]; then
            echo "Removing all containers and volumes..."
            $DOCKER_COMPOSE down -v
            echo "Done."
        else
            echo "Operation cancelled."
        fi
        ;;
    help|*)
        show_help
        ;;
esac