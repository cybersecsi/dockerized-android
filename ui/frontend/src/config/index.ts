export const BACKEND_ENDPOINT: { [properties: string ]: string } = {
    API: "http://localhost:4242",
    VNC: "ws://localhost:6080",
    PATH_TERMINAL: "/api/terminal",
    PATH_CWD: "/api/cwd",
    PATH_DEVICE: "/api/device",
    PATH_REBOOT: "/api/reboot",
    PATH_SMS: "/api/sms",
    PATH_APK: "/api/apk",
    PATH_FORWARD: "/api/forward",
}

export const CREDITS: { [properties: string ]: string } = {
    GITHUB: "http://github.com/effesociety/",
}

export const GRAPHIC: { [properties: string ]: number } = {
    NUM_COL: window.innerWidth > 1920 ? 6 : 8
}