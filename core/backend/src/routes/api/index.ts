import express from 'express'
import fileUpload from 'express-fileupload';
import util from 'util';
import Logger from '../../loaders/logger';

// Config
import { FEATURES } from '../../config';

// Types
import { IFeatures, IDeviceInfo } from '../../types';

const exec = util.promisify(require('child_process').exec);
const api = express.Router(); //Define Express Router

// Define default error message
const DEFAULT_ERROR_MESSAGE = "Error while processing request";

// Define middlewares to use in different endpoints
const defaultMiddlewares = [
    express.json(),
    express.urlencoded({extended: true})
]

const fileUploadMiddlewares = [
    fileUpload()
]

// Define middleware to check if the feature is available
const featureAvailableMiddleware = (featureName: string) => {
    return (req: any, res: any, next: any) => {
        if (!FEATURES[featureName]){
            res.status(400).send(DEFAULT_ERROR_MESSAGE);
        }
        else {
            next();
        }
    }
}

// Define middleware to check if a feature should be available only for some kind (emulator or real device)
const deviceTypeMiddleware = (allowedType: "REAL_DEVIC" | "EMULATOR") => {
    return (req: any, res: any, next: any) => {
        const deviceType: "REAL_DEVICE" | "EMULATOR" = process.env.REAL_DEVICE !== undefined ? "REAL_DEVICE" : "EMULATOR";
        if (deviceType !== allowedType){
            res.status(400).send(DEFAULT_ERROR_MESSAGE);
        }
        else {
            next();
        }
    }
}

// Helper function to get the adb option to address the right device in adb
const getAdbOption = (): string => {
    const type: "Real Device" | "Emulator" = process.env.REAL_DEVICE !== undefined ? "Real Device" : "Emulator";
    if (type === "Emulator"){
        return "-e"
    }
    else if (type === "Real Device" && process.env.REAL_DEVICE_SERIAL){
        return `-s ${process.env.REAL_DEVICE_SERIAL}`;
    }
    else {
        //If there is more than a device attached it won't work unless SERIAL is specified
        return "-d";
    }
}

// API
export default (app: express.Router) => {
    app.use('/api', api)

    /**
     * Endpoint for getting info about the available features
     */
    api.get('/features', defaultMiddlewares, (req: any, res: any) => {
        Logger.info("Received request on /api/features");
        const availableFeatures: IFeatures = {
            DEVICEINFO: FEATURES.DEVICEINFO,
            TERMINAL: FEATURES.TERMINAL,
            APK: FEATURES.APK,
            SMS: process.env.REAL_DEVICE !== undefined ? false : FEATURES.SMS,
            FORWARD: process.env.REAL_DEVICE !== undefined ? false : FEATURES.FORWARD,
            REBOOT: process.env.REAL_DEVICE !== undefined ? false : FEATURES.REBOOT,
        }
        res.send(availableFeatures);
    })

    /**
     * Endpoint for getting device info
     */
    api.get('/device', defaultMiddlewares, async (req: any, res: any) => {
        Logger.info("Received request on /api/device");
        try{
            const type = process.env.REAL_DEVICE !== undefined ? "Real Device" : "Emulator";
            //Get adb option to address right device when working with more than one
            const adbOption = getAdbOption();
            const androidVersion = await exec(`adb ${adbOption} shell getprop ro.build.version.release`);
            const processor = await exec(`adb ${adbOption} shell getprop ro.product.cpu.abi`);
            const device = await exec(`adb ${adbOption} shell getprop ro.product.model`); 
            
            const deviceInfo: IDeviceInfo = {
                type: FEATURES.DEVICEINFO ? type: "NA",
                androidVersion: FEATURES.DEVICEINFO ? androidVersion["stdout"].replace("\r\n",""): "NA",
                processor: FEATURES.DEVICEINFO ? processor["stdout"].replace("\r\n",""): "NA",
                device: FEATURES.DEVICEINFO ? device["stdout"].replace("\r\n","") : "NA",
            }
            
            res.send(deviceInfo);
        }
        catch (err) {
            Logger.error('Error in GET /api/device');
            Logger.error(err);
            res.status(400).send(DEFAULT_ERROR_MESSAGE);
        }
    })

    /**
     * Endpoint for rebooting the device
     */
    api.get('/reboot', deviceTypeMiddleware('EMULATOR'), featureAvailableMiddleware('REBOOT'), defaultMiddlewares, async (req: any, res: any) => {
        Logger.info("Received request on /api/reboot");
        try{
            //Get adb option to address right device when working with more than one
            const adbOption = getAdbOption();
            await exec(`adb ${adbOption} reboot`);
            const defaultRes = {
                'action': "reboot",
                'status': "OK"
            }
            res.send(defaultRes);
        }
        catch (err) {
            Logger.error('Error in GET /api/reboot');
            Logger.error(err);
            res.status(400).send(DEFAULT_ERROR_MESSAGE);
        }

    })

    /**
     * Endpoint for sending SMS
     */
    api.post('/sms', deviceTypeMiddleware('EMULATOR'), featureAvailableMiddleware('SMS'), defaultMiddlewares, async (req: any, res: any) => {
        Logger.info("Received request on /api/sms");

        /* Get Docker container ID from within container (not needed)
        const getDockerContainerIDCmd = "head -1 /proc/self/cgroup|cut -d/ -f3";
        const {dockerID, dockerIDStderr} = await exec(getDockerContainerIDCmd);
        */

        try{
            //Get adb option to address right device when working with more than one
            const adbOption = getAdbOption();
            const sendSMSCmd = `adb ${adbOption} emu sms send ${req.body.phoneNumber} ${req.body.message}`;
            exec(sendSMSCmd);
            const defaultRes = {
                'action': "sms",
                'status': "OK"
            }
            res.send(defaultRes);
        }
        catch (err) {
            Logger.error('Error in POST /api/sms');
            Logger.error(err);
            res.status(400).send(DEFAULT_ERROR_MESSAGE);
        }
    })

    /**
     * Endpoint for installing APK
     */
    api.post('/apk', featureAvailableMiddleware('APK'), fileUploadMiddlewares, async (req: any, res: any) => {
        Logger.info("Received request on /api/apk");

        try{
            const apk = req.files.file;
            const mv = util.promisify(apk.mv);
            await mv(`/tmp/app.apk`);

            //Get adb option to address right device when working with more than one
            const adbOption = getAdbOption();
            const installAPKCmd = `adb ${adbOption} install /tmp/app.apk`;
            await exec(installAPKCmd);

            const defaultRes = {
                'action': "apk",
                'status': "OK"
            }
            res.send(defaultRes);
        }
        catch (err) {
            Logger.error('Error in POST /api/apk');
            Logger.error(err);
            res.status(400).send(DEFAULT_ERROR_MESSAGE);
        }
    })

    /**
     * Endpoint for Port Forwarding
     */
    api.post('/forward', featureAvailableMiddleware('FORWARD'), defaultMiddlewares, async (req: any, res: any) => {
        Logger.info("Received request on /api/forward");
        try{
            const portNumber = req.body.portNumber;

            //Get adb option to address right device when working with more than one
            const adbOption = getAdbOption();
            const adbForwardCmd = `adb ${adbOption} forward tcp:${portNumber} tcp:${portNumber}`;
            exec(adbForwardCmd);

            const rinetdForwardCmd = `/root/dockerized-android/utils/rinetd_forward.sh ${portNumber}`;
            exec(rinetdForwardCmd);

            const defaultRes = {
                'action': "forward",
                'status': "OK",
            }
            res.send(defaultRes);
        }
        catch (err) {
            Logger.error('Error in POST /api/forward');
            Logger.error(err);
            res.status(400).send(DEFAULT_ERROR_MESSAGE);
        }
    })

    /**
     * Endpoint for Terminal
     */
    api.get('/cwd', defaultMiddlewares, async (req: any, res: any) => {
        Logger.info("Received request on /api/cwd");
        const cwd = process.cwd();
        res.send(cwd);
    })

    api.post('/terminal', featureAvailableMiddleware('TERMINAL'), defaultMiddlewares, async (req: any, res: any) => {
        Logger.info("Received request on /api/terminal");

        const defaultErrorResponse = {
            'action': 'terminal',
            'status': 'error',
            'output': 'An error has occurred', //The most general error ever
            'cwd': process.cwd(),
        }

        try {
            const arg = req.body.arg;
            switch(arg[0]){
                case 'cd':
                    if(arg[1]){
                        process.chdir(arg[1]);
                        const response = {
                            'action': 'terminal',
                            'status': 'ok',
                            'output': '',
                            'cwd': process.cwd(),
                        }
                        res.send(response)
                    }
                    else {
                        res.send(defaultErrorResponse)
                    }
                    break;
                default:
                    const terminalCmd = arg.reduce((acc: string, curr: string) => `${acc} ${curr}`);
                    const {stdout} = await exec(terminalCmd);
                    const response = {
                        'action': 'terminal',
                        'status': 'ok',
                        'output': stdout,
                        'cwd': process.cwd(), 
                    }
                    res.send(response);
            }
        }
        catch (err){
            const errorResponse = {
                'action': "terminal",
                'status': "error",
                'output': err.stderr,
                'cwd': process.cwd(),
            }
            res.send(errorResponse);
        }
    })
}