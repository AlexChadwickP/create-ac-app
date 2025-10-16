# Fullstack Starter Template

A modern monorepo starter for building full-stack applications with tRPC, React, and PostgreSQL. Created by [Alex Chadwick](https://github.com/yourusername).

## Tech Stack

- **Monorepo**: npm workspaces
- **API**: Hono + tRPC + Drizzle ORM + better-auth
- **Frontend**: React + Vite + TanStack Router + TanStack Query + CSS Modules
- **Database**: PostgreSQL + Redis
- **Dev Tools**: Docker Compose, MailHog, Azurite

## Quick Start

**Prerequisites:**
- Node.js 20+ and npm 10+
- Docker Desktop

**Steps:**
```bash
# Clone and install
git clone <your-repo>
cd fullstack-starter
npm install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Start infrastructure
docker compose up -d

# Run the app
npm run dev
```

**Access:**
- API: http://localhost:3001
- Web: http://localhost:5173
- MailHog: http://localhost:8025

## Project Structure
```
├── apps/
│   ├── api/          # Hono backend with tRPC
│   └── web/          # React frontend with Vite
├── packages/         # Shared libraries
└── docker-compose.yml
```

## Docker Services

Local development infrastructure:

- **PostgreSQL 16** (localhost:5433) - Main database
- **Redis 7** (localhost:6379) - Caching/sessions
- **MailHog** (localhost:8025) - Email testing
- **Azurite** (localhost:10000-10002) - Azure Storage emulator
```bash
docker compose up -d      # Start services
docker compose down       # Stop services
docker compose logs -f    # View logs
```

## Available Scripts
```bash
npm run dev           # Run API + Web
npm run dev:api       # API only
npm run dev:web       # Web only
npm run build         # Build all
npm run test          # Test all
```

Target specific workspaces:
```bash
npm run build --workspace=apps/api
```

## Environment Variables

Copy `.env.example` to `.env` and configure:
```env
# Database
DATABASE_URL=postgresql://dev:dev@localhost:5433/dev

# Redis
REDIS_URL=redis://localhost:6379

# API
PORT=3001
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3001
```

## Authentication

This template uses [better-auth](https://better-auth.com) with:
- Email/password authentication
- Session management
- First user automatically becomes admin
- Protected tRPC procedures

## Key Features

- **Type-safe API** - Full type safety from database to frontend via tRPC
- **File-based routing** - TanStack Router with automatic route generation
- **Database migrations** - Drizzle ORM with schema management
- **Docker dev environment** - All services containerized
- **Monorepo structure** - Shared code between apps

## Troubleshooting

**Port conflicts:**
Update ports in `docker-compose.yml` or `.env`

**Database connection issues:**
Ensure Docker is running: `docker compose ps`

**Email not sending:**
Check MailHog UI at http://localhost:8025

## License

MIT - Created by Alex Chadwick

---

Built with experience from production deployments at The Fusion Works.