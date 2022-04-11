FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies.
RUN npm install --only= production

COPY . ./


CMD ["npm", "start"]

