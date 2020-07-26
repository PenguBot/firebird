FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --no-bin-links --link-duplicates

COPY dist .

CMD ["yarn", "run", "docker:start"]
