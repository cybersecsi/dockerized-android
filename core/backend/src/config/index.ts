export const FEATURES: { [properties: string ]: boolean } = {
    DEVICEINFO: process.env.DEVICEINFO === "false" ? false : true,
    TERMINAL: process.env.TERMINAL === "false" ? false : true,
    APK: process.env.APK === "false" ? false : true,
    FORWARD: process.env.FORWARD === "false" ? false : true,
    SMS: process.env.SMS === "false" ? false : true,
    REBOOT: process.env.REBOOT === "false" ? false : true,
}