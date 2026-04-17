FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV PORT=8080
EXPOSE 8080
ENV NODE_ENV=production

CMD ["node", "src/server.js"]
