FROM node:21-alpine3.18

RUN apk upgrade --no-cache && apk add --no-cache git

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN git clone --depth=1 https://github.com/smart-cab/certs.git /app/certs

CMD ["yarn", "start"]
EXPOSE 3000
