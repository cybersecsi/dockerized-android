#!/bin/bash

#Create docker image
cd ../ui
sudo docker build . -t secsi/dockerized-android-ui