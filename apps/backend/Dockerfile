# Use node 22.20 and the alpine 3.21 base image (Mini OS)
FROM node:22.20-alpine3.21

# Install pnpm globally (thi command is comming from the doc site)
RUN npm install -g pnpm@latest-10

# Create app directory and 
WORKDIR /app

# Copy package.json and package-lock.json files and install
COPY package*.json .

RUN pnpm install

COPY . .

RUN pnpx prisma generate

# IMPORTANT: I FAILES HERE -> NEVER RUN MIGRATIONS ON A CONTAINER BUILD
# |-> THIS SHOULD BE DONE ON CONTAINER STARTUP (COMANDLINE LIKE: 'docker exec -it backend-container pnpx prisma migrate dev')
# |-> OR WITH DOCKER COMPOSE / KUBERNETES
# RUN pnpx prisma migrate dev --name init 


CMD ["pnpm", "run", "start:dev"]