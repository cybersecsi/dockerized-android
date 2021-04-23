#################################
#           STAGE 1             #
#################################

# First stage: build custom backend
FROM node:lts-alpine as stage1

RUN apk add tzdata
# Create backend directory
WORKDIR /usr/src/instance-manager
COPY . .
RUN yarn install --production && mv node_modules prod_node_modules
RUN yarn install
RUN yarn run build

#################################
#           STAGE 2             #
#################################

# Second stage: run instance manager

FROM node:lts-alpine

WORKDIR /usr/src/instance-manager

# Copy builded backend
COPY --from=stage1 /usr/src/instance-manager/package.json ./package.json
COPY --from=stage1 /usr/src/instance-manager/prod_node_modules ./node_modules
COPY --from=stage1 /usr/src/instance-manager/build ./build

EXPOSE 7373
CMD [ "node", "./build/app.js" ]
