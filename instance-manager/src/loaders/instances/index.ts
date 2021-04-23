import Logger from '../logger';

// Config
import { INSTANCES } from '../../config';

// Helpers 
import { getInstances } from '../../helpers';

export default async () => {
    try {
        console.log(INSTANCES.CONFIG_FILE)
        await getInstances();   
    }
    catch (error) {
        Logger.error("File instances.json not found. Exiting")
        process.exit(1)
    }
}
