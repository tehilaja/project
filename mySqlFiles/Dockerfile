FROM mysql:8.0.17

ENV MYSQL_ROOT_PASSWORD: 12345678
ENV MYSQL_DATABASE: magdilimdb

COPY *.sql /docker-entrypoint-initdb.d/

EXPOSE 3306