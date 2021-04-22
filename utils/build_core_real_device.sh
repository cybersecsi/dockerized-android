#!/bin/bash

#Create docker image
cd ../core
sudo docker build . -f Dockerfile.device -t effesociety/dockerized-android-core-real-device
