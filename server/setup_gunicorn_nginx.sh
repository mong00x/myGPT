#!/bin/bash

# Variables
PROJECT_PATH="/home/ubuntu/myGPT/server"
PROJECT_NAME="server"
DOMAIN_NAME="www.myopenaiapi.net"

# Install Gunicorn
pip install gunicorn

# Run Gunicorn
cd "$PROJECT_PATH"
gunicorn --workers 3 "$PROJECT_NAME".wsgi:application &

# Install Nginx
sudo apt-get update
sudo apt-get install nginx -y

# Configure Nginx for Django Application
sudo bash -c "cat > /etc/nginx/sites-available/$DOMAIN_NAME" << EOL
server {
    listen 80;
    server_name $DOMAIN_NAME;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root $PROJECT_PATH;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:$PROJECT_PATH/$PROJECT_NAME.sock;
    }
}
EOL

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/$DOMAIN_NAME /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Allow HTTP traffic through firewall (if using ufw)
# sudo ufw allow 'Nginx Full'

# Create Gunicorn systemd service file
sudo bash -c "cat > /etc/systemd/system/gunicorn.service" << EOL
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=$PROJECT_PATH
ExecStart=$(which gunicorn) --workers=3 --bind unix:$PROJECT_PATH/$PROJECT_NAME.sock $PROJECT_NAME.wsgi:application

[Install]
WantedBy=multi-user.target
EOL

# Enable and start Gunicorn service
sudo systemctl enable gunicorn
sudo systemctl start gunicorn

# Output for user
echo "Gunicorn and Nginx have been configured for your Django application."
