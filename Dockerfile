FROM bitnami/node as base

WORKDIR /src
COPY package.json package-lock.json /src/
COPY . /src
EXPOSE 8000

FROM base as production

ENV NODE_ENV=production
RUN npm install --production

CMD ["node", "server.js"]

FROM base as dev

ENV NODE_ENV=development
RUN npm config set unsafe-perm true && npm install -g nodemon
RUN npm install
CMD ["npm", "start"]
