# DeepPeru - Login Template

Template con autenticación usando NestJS (backend) y Next.js (frontend).

## Estructura del Proyecto

```
apps/
├── backend/    # API NestJS + Prisma + PostgreSQL
└── frontend/   # Next.js 15 + React 19 + Zustand
```

## Requisitos

- Node.js 20+
- pnpm 10+
- PostgreSQL 14+

## Instalación

Cada proyecto es independiente. Instala las dependencias por separado:

### Backend

```bash
cd apps/backend
pnpm install
pnpm approve-builds  # Aprobar scripts de Prisma y NestJS
```

### Frontend

```bash
cd apps/frontend
pnpm install
pnpm approve-builds  # Aprobar scripts de sharp
```

## Configuración

### Backend

1. Crear `apps/backend/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/deepperu"
JWT_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/api/auth/google/callback"
```

2. Ejecutar migraciones:

```bash
cd apps/backend
pnpm prisma migrate dev
pnpm prisma generate
```

### Frontend

Variables de entorno en `apps/frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Desarrollo

### Backend (puerto 3000)

```bash
cd apps/backend
pnpm run start:dev
```

### Frontend (puerto 4000)

```bash
cd apps/frontend
pnpm run dev
```

## Comandos Útiles

### Backend

```bash
# Generar cliente Prisma
cd apps/backend
pnpm prisma generate

# Ver base de datos en interfaz gráfica
pnpm prisma studio

# Crear nueva migración
pnpm prisma migrate dev --name nombre_migracion

# Tests
pnpm run test
pnpm run test:watch
pnpm run test:e2e
```

### Frontend

```bash
# Build producción
cd apps/frontend
pnpm run build
pnpm run start
```

## Tecnologías

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

## Estructura de Base de Datos

Ver modelos en `apps/backend/prisma/schema.prisma`
