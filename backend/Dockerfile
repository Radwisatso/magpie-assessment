FROM node

WORKDIR /app

ENV NODE_ENV=development

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]