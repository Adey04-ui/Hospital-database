FROM php:8.2-apache

# Force Apache to use ONLY prefork MPM (safe & idempotent)
RUN rm -f /etc/apache2/mods-enabled/mpm_event.* \
    && rm -f /etc/apache2/mods-enabled/mpm_worker.* \
    && ln -sf /etc/apache2/mods-available/mpm_prefork.load /etc/apache2/mods-enabled/mpm_prefork.load

# Enable rewrite
RUN a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy project files
COPY . /var/www/html/

# Permissions
RUN chown -R www-data:www-data /var/www/html
