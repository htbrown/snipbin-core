import * as express from 'express';
import { logger } from '../index';
import { ApiResponse } from './types';

export default class Utilities {

    public static sendError(status: number, message: string, res: express.Response) {
        logger.log('express', `WARN: A ${status} error was sent for the last call with the following message: \n${message}`);
        
        let result: ApiResponse = { status, error: true, data: message };
        res.status(status);
        res.send(result);
    }

}