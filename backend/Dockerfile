FROM php:8.2-apache

# Enable required Apache modules
RUN a2enmod rewrite

# Install PHP extensions for MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy your project files
COPY . /var/www/html/

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80 (Railway will handle the external port)
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]