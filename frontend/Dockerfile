FROM node:21-alpine3.18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ADD https://github.com/smart-cab/certs.git ./certs

CMD ["yarn", "start"]
EXPOSE 3000
