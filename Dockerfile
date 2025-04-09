FROM node:18-alpine AS builder

WORKDIR /app

COPY server/package*.json ./

RUN npm ci

COPY server/. .

RUN npm run build
RUN npm run prisma:generate

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 3000
EXPOSE 50051

CMD ["npm", "start"]