FROM php:8.2-apache

# Enable mysqli
RUN docker-php-ext-install mysqli

# Enable Apache rewrite (safe even if unused)
RUN a2enmod rewrite

# Set backend as document root
ENV APACHE_DOCUMENT_ROOT=/var/www/html

RUN sed -ri 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf

# Copy backend code
COPY . /var/www/html/

# Permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
