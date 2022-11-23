# Dockerfile for Noa Frontend
FROM node:alpine as build
WORKDIR /app
COPY . .
RUN yarn install
RUN CI=false yarn build

FROM nginx:alpine
EXPOSE 443 80

WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
COPY --from=build /app/.env.production ./.env
RUN apk add --no-cache bash

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
