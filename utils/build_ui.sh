#!/bin/bash

#Create docker image
cd ../ui
sudo docker build . -t effesociety/dockerized-android-ui