# Wybór lekkiego obrazu Node.js
FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]
