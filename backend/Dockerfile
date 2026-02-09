FROM php:8.2-apache

# Disable all other MPMs and enable prefork
RUN a2dismod mpm_event mpm_worker \
    && a2enmod mpm_prefork rewrite

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy project files
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html
