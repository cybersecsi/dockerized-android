export const BACKEND_ENDPOINT: { [properties: string ]: string } = {
    CORE_PREFIX: "http://",
    CORE_PORT: "4242",
    VNC_PREFIX: "ws://",
    VNC_PORT: "6080",
    PATH_FEATURES: "/api/features",
    PATH_TERMINAL: "/api/terminal",
    PATH_CWD: "/api/cwd",
    PATH_DEVICE: "/api/device",
    PATH_REBOOT: "/api/reboot",
    PATH_SMS: "/api/sms",
    PATH_APK: "/api/apk",
    PATH_FORWARD: "/api/forward",
}

export const INSTANCE_MANAGER_ENDPOINT: { [properties: string ]: string } = {
    PATH_INSTANCES: "/api/instances",
}

export const CREDITS: { [properties: string ]: string } = {
    GITHUB: "http://github.com/effesociety/",
}

export const GRAPHIC: { [properties: string ]: number } = {
    NUM_COL: window.innerWidth > 1920 ? 6 : 8
}