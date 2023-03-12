FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY ./dist ./dist
COPY .env.docker .env
CMD [ "npm", "start" ]