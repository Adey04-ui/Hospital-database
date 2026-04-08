FROM php:8.2-apache

# Remove all MPMs manually, then enable only prefork
RUN rm -f /etc/apache2/mods-enabled/mpm_* \
    && a2enmod mpm_prefork

RUN a2enmod rewrite headers

RUN docker-php-ext-install mysqli pdo pdo_mysql

# COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

CMD ["apache2-foreground"]