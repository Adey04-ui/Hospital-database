FROM php:8.2-cli

WORKDIR /app
COPY . .

# Install mysqli + pdo_mysql
RUN docker-php-ext-install mysqli pdo pdo_mysql

CMD ["php", "-S", "0.0.0.0:8080", "-t", "."]