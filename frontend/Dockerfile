FROM node:21-alpine3.18

WORKDIR /app

ADD https://github.com/smart-cab/certs.git /app/certs

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "start"]
EXPOSE 3000
