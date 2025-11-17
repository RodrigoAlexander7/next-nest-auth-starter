#!/bin/bash
cd apps/backend
pnpm prisma migrate deploy
pnpm start:dev

