# base
FROM node:20-alpine AS base
COPY scripts/ scripts/

ARG WORKSPACE
ENV WORKSPACE=${WORKSPACE}

# builder
FROM base AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm i -g turbo
COPY . .

COPY --from=base /scripts/validate_workspace.sh /scripts/
RUN sh /scripts/validate_workspace.sh

RUN npx turbo prune --scope=${WORKSPACE} --docker

# installer
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json .
RUN npm i

COPY --from=builder /app/out/full .

RUN npx turbo build --filter=${WORKSPACE}...

# runner
FROM base AS runner
WORKDIR /app

# COPY --from=installer /app/apps/package.json .
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=installer --chown=nodejs:nodejs /app/ .
# COPY --from=installer --chown=nodejs:nodejs /app/node_modules/ /app/node_modules/

ARG ENVIRONMENT=none
ENV ENVIRONMENT=${ENVIRONMENT}

COPY --from=base /scripts/start.sh /scripts/
ENTRYPOINT /bin/sh /scripts/start.sh

ENV SERVICE_ARGS=""
CMD ${SERVICE_ARGS}
