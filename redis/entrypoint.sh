#!/usr/bin/env sh
set -e

redis-server --tls-port 6379 --port 0 \
    --tls-cert-file /tls/sch1357.ru.crt \
    --tls-key-file /tls/sch1357.ru.key \
    --tls-ca-cert-file /tls/myCA.pem
