#!/bin/bash

ANDROID_VERSION=""
API_LEVEL=""

if [ "$1" == "" ]; then
	echo "Parameter 1 is empty"
	echo "Usage: $0 [ANDROID_VERSION]"
	echo "Supported values for ANDROID_VERSION: [5.0.1, 5.1.1, 6.0, 7.0, 7.1.1, 8.0, 8.1, 9.0, 10.0, 11.0]"
	exit 1
else
	case $1 in
		"5.0.1")
			ANDROID_VERSION="5.0.1"
			API_LEVEL="21"
			;;
		"5.1.1")
			ANDROID_VERSION="5.1.1"
			API_LEVEL="22"
			;;
		"6.0")
			ANDROID_VERSION="6.0"
			API_LEVEL="23"
			;;
		"7.0")
			ANDROID_VERSION="7.0"
			API_LEVEL="24"
			;;
		"7.1.1")
			ANDROID_VERSION="7.1.1"
			API_LEVEL="25"
			;;
		"8.0")
			ANDROID_VERSION="8.0"
			API_LEVEL="26"
			;;
		"8.1")
			ANDROID_VERSION="8.1"
			API_LEVEL="27"
			;;
		"9.0")
			ANDROID_VERSION="9.0"
			API_LEVEL="28"
			;;
		"10.0")
			ANDROID_VERSION="10.0"
			API_LEVEL="29"
			;;
		"11.0")
			ANDROID_VERSION="11.0"
			API_LEVEL="30"
			;;
		*)
			echo "Parameter 1 is empty"
			echo "Usage: $0 [ANDROID_VERSION]"
			echo "Supported values for ANDROID_VERSION: [5.0.1, 5.1.1, 6.0, 7.0, 7.1.1, 8.0, 8.1, 9.0, 10.0, 11.0]"
			exit 1
			;;
	esac
fi

#Create docker image
cd ../core
if [ -z "${ANDROID_VERSION}" ]; then
	sudo docker build . -f Dockerfile.emulator 
else
	IMAGE_NAME="secsi/dockerized-android-core-emulator-${ANDROID_VERSION}"
	sudo docker build . -f Dockerfile.emulator  -t $IMAGE_NAME \
		--build-arg ANDROID_VERSION=$ANDROID_VERSION \
		--build-arg API_LEVEL=$API_LEVEL
fi