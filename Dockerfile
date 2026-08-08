# The menu is a static site, so the build stage always runs on the builder's own
# architecture and only the (architecture-independent) dist/ crosses into the
# final image. That keeps arm64 images fast to build on an amd64 runner.
FROM --platform=$BUILDPLATFORM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

# The image's own entrypoint renders /etc/nginx/templates/*.template into conf.d at start-up. The
# filter keeps envsubst away from nginx's own $variables, so only ${MENU_*} are replaced.
ENV NGINX_ENVSUBST_FILTER=^MENU_

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/healthz || exit 1
