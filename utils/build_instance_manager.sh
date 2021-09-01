#!/bin/bash

#Create docker image
cd ../instance-manager
sudo docker build . -t secsi/dockerized-android-instance-manager