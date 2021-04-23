export const FEATURES: { [properties: string ]: boolean } = {
    DEVICEINFO: process.env.DEVICEINFO === "true" || true,
    TERMINAL: process.env.TERMINAL === "true" || true,
    APK: process.env.APK === "true" || true,
    FORWARD: process.env.FORWARD === "true" || true,
    SMS: process.env.SMS === "true" || true,
    REBOOT: process.env.REBOOT === "true" || true,
}