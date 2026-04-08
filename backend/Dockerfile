FROM php:8.2-apache

# Remove ALL MPM configs completely
RUN rm -f /etc/apache2/mods-enabled/mpm_* \
    && a2enmod mpm_prefork

RUN a2enmod rewrite

RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html

RUN apache2ctl -M | grep mpm

CMD ["apache2-foreground"]