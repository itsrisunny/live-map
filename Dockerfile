# ---------- Build Stage ----------
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=build /app/build ./build
COPY server.js .

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
