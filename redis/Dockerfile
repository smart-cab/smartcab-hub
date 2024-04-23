FROM redis:alpine3.18

WORKDIR /redis

ADD https://github.com/smart-cab/certs.git /tls

COPY . .

CMD ["/redis/entrypoint.sh"]
