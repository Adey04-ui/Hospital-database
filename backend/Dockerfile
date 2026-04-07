FROM php:8.2-apache

# Enable necessary modules
RUN a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy project files
COPY . /var/www/html/

# Fix permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Important: Expose the port Railway will use
EXPOSE 80

# Start Apache in foreground
CMD ["apache2-foreground"]