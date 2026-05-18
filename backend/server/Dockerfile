FROM node:22-slim

WORKDIR /app


RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
RUN npm install

COPY . .

# Prisma
RUN npx prisma generate

EXPOSE 5000
CMD ["npm", "start"]