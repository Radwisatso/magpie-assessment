FROM node

WORKDIR /app

ENV NODE_ENV=development

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "./dist/src/main.js"]