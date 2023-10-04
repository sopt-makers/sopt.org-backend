#!/bin/bash

# Update package list and install dependencies
apt-get update
apt-get install -y wget gnupg

# Add Google Chrome repository key
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

# Add Google Chrome repository
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

# Update package list again
apt-get update

# Install Google Chrome and required fonts
apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends

# Clean up
rm -rf /var/lib/apt/lists/*

# Start Node Server
yarn run start