FROM oven/bun:1

WORKDIR /usr/src/app

# Install OpenSSL ( for Prisma )
RUN apt-get update -y && apt-get install -y openssl

# Copy files
COPY ./packages ./packages
COPY ./bun.lock ./bun.lock
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./apps/ws-server ./apps/ws-server

# Inject the correct env file (passed as build arg)
ARG ENV_FILE
COPY ./packages/db/${ENV_FILE} ./packages/db/.env

# Install deps and generate Prisma client
RUN bun install
RUN bun run db:generate

EXPOSE 8080

CMD ["bun","run","./apps/ws-server/index.ts"]