import express from 'express';
import Loaders from './loaders';
/*
****************
*   ENV VARS   *
****************
*/
const NODE_ENV = process.env.NODE_ENV || "development";
const DEFAULT_PORT = process.env.PORT || 7373;

/*
******************
* API *
******************
*/
const startBackend = async () => {

    console.log(process.env.NODE_ENV)
    console.log(NODE_ENV)

	const app = express();
	await Loaders(app);
	app.listen(DEFAULT_PORT, () => {
		console.log(`Starting Node App in ${NODE_ENV} mode on port ${DEFAULT_PORT}`)
	});
}

startBackend();