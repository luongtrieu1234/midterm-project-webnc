# Application Docker file Configuration
# Visit https://docs.docker.com/engine/reference/builder/
# Using multi stage build

# Prepare the image when build
# also use to minimize the docker image
FROM node:18

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install -g sequelize sequelize-cli @nestjs/cli

RUN npm install

COPY . .

RUN npm run build

# CMD ["npm", "run", "start:dev"]


# Build the image as production
# So we can minimize the size
# FROM node:14-alpine

# WORKDIR /app
# COPY package*.json tsconfig.json ./
# ENV PORT=4000
# ENV NODE_ENV=Production
# RUN npm install
# COPY --from=builder /app/dist ./dist
# EXPOSE ${PORT}

# CMD ["npm", "run", "start"]