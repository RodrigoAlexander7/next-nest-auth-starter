# DeepPeru

## Requisitos

- Node.js 18+
- pnpm 10+
- PostgreSQL

## Instalación

```bash
pnpm install
```

## Configuración

### Backend

Crear `apps/backend/.env`:

Ejecutar migraciones:

```bash
cd apps/backend
pnpm prisma migrate dev
```

## Desarrollo

Para backend

```bash
./init_backend.sh
```

### Comandos útiles

```bash
# Generate prisma
cd ./apps/backend
pnpx prisma generate

# Formatear código
pnpm run format

# Verificar formato
pnpm run format:check

# Tests
pnpm --filter @deepperu/backend run test
```

## Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato de código
refactor: refactorización
test: tests
chore: mantenimiento
```

## Estructura

```
apps/
├── backend/    # NestJS + Prisma
└── frontend/   # Next.js
```
