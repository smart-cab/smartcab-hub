FROM alpine:3.17

WORKDIR /app

RUN apk upgrade --no-cache && apk add --no-cache libgcc gcc musl-dev bind-tools yaml-dev yarn

COPY . .

RUN yarn --frozen-lockfile --link-duplicates --network-timeout 500000

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=512

CMD ["yarn", "start"]
EXPOSE 3000
