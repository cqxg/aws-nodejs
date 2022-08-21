FROM node:12.16.3-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

COPY . /usr/src/app

RUN npm install --no-install-recommends

USER node

EXPOSE 3000

ENTRYPOINT [ "node", "app.js" ]

CMD ["npm", "run", "start"]