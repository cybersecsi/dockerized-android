import express from 'express';
import cors from 'cors';
import routes from '../../routes';

export default async (app: express.Application) => {
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    // Load routes
    app.use("/", routes());
}