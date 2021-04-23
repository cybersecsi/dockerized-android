#################################
#           STAGE 1             #
#################################

# First stage: build frontend
FROM node:lts-alpine as stage1
WORKDIR /usr/src/frontend
COPY . .
RUN yarn install && yarn run build

#################################
#           STAGE 2             #
#################################

# Second stage: run nginx
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
# Remove default files
RUN rm -rf /usr/share/nginx/html/*
# Copy builded frontend
COPY --from=stage1 /usr/src/frontend/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]