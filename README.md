## Project Structure

```
apps/
├── backend/    # API NestJS + Prisma + PostgreSQL
└── frontend/   # Next.js 15 + React 19 + Zustand
```

## Requirements

- Node.js 20+
- pnpm 10+
- PostgreSQL 14+

## Autentication Workflow (Backend)
<img width="1840" height="771" alt="backend-auth-workflow" src="https://github.com/user-attachments/assets/3b40d425-f147-4b71-94ab-bf4080b1c939" />


## Autentication Workflow (frontend)
 Is just a promise yet...

## Installation

Each project is independent. Install dependencies separately:

### Backend

```bash
cd apps/backend
pnpm install
pnpm approve-builds  # Approve Prisma and NestJS scripts
```

### Frontend

```bash
cd apps/frontend
pnpm install
pnpm approve-builds  # Approve sharp scripts
```

## Configuration

### Backend

1. Create `apps/backend/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/deepperu"
JWT_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/api/auth/google/callback"
```

2. Run migrations:

```bash
cd apps/backend
pnpm prisma migrate dev
pnpm prisma generate
```

### Frontend

Environment variables in `apps/frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Development

### Backend (port 3000)

```bash
cd apps/backend
pnpm run start:dev
```

### Frontend (port 4000)

```bash
cd apps/frontend
pnpm run dev
```

## Useful Commands

### Backend

```bash
# Generate Prisma client
cd apps/backend
pnpm prisma generate

# View database in graphical interface
pnpm prisma studio

# Create new migration
pnpm prisma migrate dev --name migration_name

# Tests
pnpm run test
pnpm run test:watch
pnpm run test:e2e
```

### Frontend

```bash
# Production build
cd apps/frontend
pnpm run build
pnpm run start
```

## Technologies

### Backend
- NestJS 11
- Prisma 6
- PostgreSQL
- Passport (Google OAuth)
- JWT

### Frontend
- Next.js 15
- React 19
- Zustand (state management)
- Tailwind CSS 4
- TypeScript 5

## Database Structure

See models in `apps/backend/prisma/schema.prisma`

---

## 🚀 Running with Docker

### Backend

Build the image:

```bash
cd apps/backend
docker build -t adopta-backend .
```

Run the container:

```bash
docker run -d --name adopta-backend -p 3000:3000 adopta-backend
```

Run Prisma migrations inside the container:

```bash
docker exec -it adopta-backend pnpx prisma migrate dev
```

---

### Frontend

Build the image:

```bash
cd apps/frontend
docker build -t frontend-app .
```

Run the container:

```bash
docker run -d --name frontend-app -p 4000:4000 frontend-app
```
