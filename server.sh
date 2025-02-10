#!/bin/bash

# Install pm2 globally
sudo npm install -g pm2

# Install npm dependencies
sudo npm install

# Change directory to src
cd src/

# Create the config/firestore directory if it doesn't exist
mkdir -p ./config/firestore 

# Copy the secret.json file from S3 to the config/firestore directory
aws s3 cp s3://firestoreconfig/secret.json ./config/firestore/secret.json

# Change directory back to the root
cd ..

# Create the .env file
sudo touch .env

# Add environment variables to the .env file
echo "FIRESTORE_DATABASE_URL=https://g-pharmacy-1cf87.firebaseio.com/" | sudo tee -a .env
echo "PORT=8000" | sudo tee -a .env
echo "MAIL_HOST=smtp.gmail.com" | sudo tee -a .env
echo "MAIL_PORT=587" | sudo tee -a .env
echo "MAIL_USER=othmandevsup@gmail.com" | sudo tee -a .env
echo "MAIL_PASS=nfcagvdvotqjsjli" | sudo tee -a .env
echo "MAIL_FROM=GUARDMED" | sudo tee -a .env
echo "JWT_SECRET=meow" | sudo tee -a .env

# Start the application using pm2
sudo pm2 start npm --name "my-app" -- run start