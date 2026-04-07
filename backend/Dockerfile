FROM php:8.2-apache

RUN a2enmod rewrite
RUN a2enmod headers 

RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

CMD apache2-foreground