#!/bin/bash

ANDROID_VERSION=""
API_LEVEL=""
CHROME_DRIVER=""


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
			CHROME_DRIVER="2.21"
			;;
		"5.1.1")
			ANDROID_VERSION="5.1.1"
			API_LEVEL="22"
			CHROME_DRIVER="2.13"
			;;
		"6.0")
			ANDROID_VERSION="6.0"
			API_LEVEL="23"
			CHROME_DRIVER="2.18"
			;;
		"7.0")
			ANDROID_VERSION="7.0"
			API_LEVEL="24"
			CHROME_DRIVER="2.23"
			;;
		"7.1.1")
			ANDROID_VERSION="7.1.1"
			API_LEVEL="25"
			CHROME_DRIVER="2.28"
			;;
		"8.0")
			ANDROID_VERSION="8.0"
			API_LEVEL="26"
			CHROME_DRIVER="2.31"
			;;
		"8.1")
			ANDROID_VERSION="8.1"
			API_LEVEL="27"
			CHROME_DRIVER="2.33"
			;;
		"9.0")
			ANDROID_VERSION="9.0"
			API_LEVEL="28"
			CHROME_DRIVER="2.40"
			;;
		"10.0")
			ANDROID_VERSION="10.0"
			API_LEVEL="29"
			CHROME_DRIVER="74.0.3729.6"
			;;
		"11.0")
			ANDROID_VERSION="11.0"
			API_LEVEL="30"
			CHROME_DRIVER="83.0.4103.39"
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
	IMAGE_NAME="effesociety/dockerized-android-core-emulator-${ANDROID_VERSION}"
	sudo docker build . -f Dockerfile.emulator  -t $IMAGE_NAME \
		--build-arg ANDROID_VERSION=$ANDROID_VERSION \
		--build-arg API_LEVEL=$API_LEVEL \
		--build-arg CHROME_DRIVER=$CHROME_DRIVER
fi