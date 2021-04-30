import express from 'express';
import Loaders from './loaders';
/*
****************
*   ENV VARS   *
****************
*/
const NODE_ENV = process.env.NODE_ENV || "development";
const DEFAULT_PORT = process.env.CUSTOM_APP_DEFAULT_PORT || 4242;

/*
******************
* API *
******************
*/
const startBackend = async () => {
	const app = express();
	await Loaders(app);
	app.listen(DEFAULT_PORT, () => {
		console.log(`Starting Node App in ${NODE_ENV} mode on port ${DEFAULT_PORT}`)
	});
}

startBackend();
