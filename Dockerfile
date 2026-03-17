FROM node:22-alpine AS build

WORKDIR /app

ARG DIRECTUS_URL
ARG DIRECTUS_TOKEN
ENV DIRECTUS_URL=$DIRECTUS_URL
ENV DIRECTUS_TOKEN=$DIRECTUS_TOKEN

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

ENV HOST=0.0.0.0
ENV PORT=4321
ENV DIRECTUS_URL=${DIRECTUS_URL}
ENV DIRECTUS_TOKEN=${DIRECTUS_TOKEN}

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
