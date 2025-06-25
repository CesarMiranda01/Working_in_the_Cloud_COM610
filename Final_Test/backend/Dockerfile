# FROM node:20-alpine AS builder

# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci
# COPY . .
# RUN npm run build

# FROM node:20-alpine
# WORKDIR /app
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# ENV NEXT_PUBLIC_API_URL=http://localhost:4000/api
# ENV NODE_ENV=production

# EXPOSE 3000
# CMD ["npm", "start"]


FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Copiar TODOS los archivos necesarios para producción
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV NEXT_PUBLIC_API_URL=http://localhost:4000/api
ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "server.js"]