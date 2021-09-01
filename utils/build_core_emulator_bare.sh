#!/bin/bash

#Create docker image
cd ../core
sudo docker build . -f Dockerfile.emulator -t secsi/dockerized-android-core-emulator-bare