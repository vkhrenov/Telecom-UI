FROM node:22.19.0-alpine AS build

LABEL maintainer="vitas_khr@@yahoo.com"
LABEL org.opencontainers.image.title="routeUI"
LABEL org.opencontainers.image.description="Builder for routeUI"

WORKDIR /app
COPY package*.json ./

# install dependencies without optional native binaries (avoids rollup native module issue)
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build


FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#CMD ["npm", "run", "dev"]
