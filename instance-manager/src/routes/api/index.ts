import express from 'express'
import Logger from '../../loaders/logger';

// Helpers
import { getInstances } from '../../helpers';

// Types
import { IInstances } from '../../types';

const api = express.Router(); //Define Express Router

// Define default error message
const DEFAULT_ERROR_MESSAGE = "Error while processing request";

// Define middlewares to use in different endpoints
const defaultMiddlewares = [
    express.json(),
    express.urlencoded({extended: true})
]

// API
export default (app: express.Router) => {
    app.use('/api', api)

    /**
     * Endpoint for getting info about the available features
     */
    api.get('/instances', defaultMiddlewares, async (req: any, res: any) => {
        Logger.info("Received request on /api/instances");
        try {
            const instances: IInstances = await getInstances();
            res.send(instances)
        }
        catch (error) {
            Logger.error('Error in GET /api/instances')
            res.status(400).send(DEFAULT_ERROR_MESSAGE);
        }
    })
}