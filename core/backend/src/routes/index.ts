import { Router } from 'express';
import api from './api';

export default (): Router => {
    const app: Router = Router();
    api(app);
    return app;
}
