# Dockerized Android

DON'T PANIC
This README is still a **work in progress**, there is just the minimum to give it a try.

## Intro
The project is composed by two main pieces:
- Dockerized Android **Core**
- Dockerized Android **UI**

## Dockerized Android CORE
**Core** runs the Android Emulator (or scrcpy if a **real device** is attached), VNC (**xvfb**, **x11vnc**, **websockify**) and a Node.js Backend. Core comes in **three** flavours:
- **emulator**: contains a pre-downloaded system image, meaning that is works out of the box
- **bare**: contains only the minimum parts of the Android SDK, it is intended to be used mounting the volume containing the Android system images
- **real-device**: version to be used with a real device attached to the host machine

| Port # |       Description      |
|:------:|:----------------------:|
|  5555  |        ADB port        |
|  4242  |     Node.js Backend    |
|  6080  | Websockify (for noVNC) |

## Dockerized Android UI
**UI** runs a *React* frontend that is used to actually connect to the Android device.

| Port # |   Description  |
|:------:|:--------------:|
|   80   | React frontend |

## How to run
In order to run the full version you have to build a **core** Docker image and the **UI** image. In order to do that you may use the scripts placed in the *utils* folder.
After building these images you may use the **docker-compose.yml** (the **real-device** flavour is set, remember to change that if you are using another flavour).

```
docker-compose up
```