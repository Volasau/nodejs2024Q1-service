FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
