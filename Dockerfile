# base image
FROM node:14.16.1-alpine

# Create app directory
WORKDIR /usr/src/sarvie

ARG NODE_ENV=Production 
ENV NODE_ENV ${NODE_ENV}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
