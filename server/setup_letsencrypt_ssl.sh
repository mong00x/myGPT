#!/bin/bash

# Variables
DOMAIN_NAME="www.myopenaiapi.net"
NGINX_CONFIG_PATH="/etc/nginx/sites-enabled/$DOMAIN_NAME.conf"

# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx -y

# Stop Nginx to free up port 80
sudo systemctl stop nginx

# Obtain Let's Encrypt SSL Certificate
sudo certbot certonly --standalone --preferred-challenges http -d $DOMAIN_NAME

# Modify Nginx configuration to use the SSL certificate
sudo bash -c "cat >> $NGINX_CONFIG_PATH" << EOL
server {
    listen 443 ssl;
    server_name $DOMAIN_NAME;
    ssl_certificate /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem;

    # Additional config ...
}
EOL

# Start Nginx
sudo systemctl start nginx

# Automatically renew Let's Encrypt certificates
sudo crontab -l > mycron
echo "@weekly certbot renew --pre-hook \"systemctl stop nginx\" --post-hook \"systemctl start nginx\" --renew-hook \"systemctl reload nginx\" --quiet" >> mycron
sudo crontab mycron
rm mycron

# Output for user
echo "Let's Encrypt SSL certificate has been configured for your domain."
