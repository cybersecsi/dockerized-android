import Logger from './logger'
import expressLoader from './express'

export default async (app: any) => {
    try {
        await expressLoader(app);
        Logger.info("Express loaded");
    }
    catch (error) {
        Logger.error("Error while loading Express");
        process.exit(1);
    }
}