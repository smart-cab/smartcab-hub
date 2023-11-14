FROM alpine:3.17

WORKDIR /app

RUN apk upgrade --no-cache && apk add --no-cache libgcc gcc musl-dev bind-tools yaml-dev yarn

COPY . .

RUN yarn --frozen-lockfile --link-duplicates

CMD ["yarn", "start"]
EXPOSE 3000
