import * as express from 'express';
import { logger } from '../index';
import { ApiResponse } from './types';

export default class Utilities {

    public static sendError(status: number, error: Error, res: express.Response) {
        logger.log('express', `WARN: A ${status} error was sent for the last call.`, error);

        let result: ApiResponse = { status, error: true, data: error.message };
        res.status(status);
        res.send(result);
    }

}