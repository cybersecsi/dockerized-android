#!/bin/bash

#Create docker image
cd ../core
sudo docker build . -f Dockerfile.device -t secsi/dockerized-android-core-real-device
