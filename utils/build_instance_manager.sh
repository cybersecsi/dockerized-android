#!/bin/bash

#Create docker image
cd ../instance-manager
sudo docker build . -t effesociety/dockerized-android-instance-manager