import moment from 'moment';
import { ILogger } from '../../types';

const Logger: ILogger = {
    info: (msg: string) => console.log(`[INFO] ${moment().format()} - ${msg}`),
    warning: (msg: string) => console.log(`[WARNING] ${moment().format()} - ${msg}`),
    error: (msg: string) => console.log(`[ERROR] ${moment().format()} - ${msg}`),
};

export default Logger;