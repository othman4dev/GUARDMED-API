#!/bin/bash

sudo npm install -g pm2

sudo touch .env

echo "FIRESTORE_DATABASE_URL=https://g-pharmacy-1cf87.firebaseio.com/" | sudo tee -a .env
echo "PORT=8080" | sudo tee -a .env
echo "MAIL_HOST=smtp.gmail.com" | sudo tee -a .env
echo "MAIL_PORT=587" | sudo tee -a .env
echo "MAIL_USER=othmandevsup@gmail.com" | sudo tee -a .env
echo "MAIL_PASS=nfcagvdvotqjsjli" | sudo tee -a .env
echo "MAIL_FROM=GUARDMED" | sudo tee -a .env
echo "JWT_SECRET=meow" | sudo tee -a .env

sudo pm2 start npm --name "my-app" -- run deploy