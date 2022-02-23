import * as dotenv from 'dotenv';
import * as express from 'express';

import { ApiResponse } from './modules/types';
import DatabaseManager from './modules/databaseManager';
import Logger from './modules/logger';
import Middleware from './modules/middleware';

dotenv.config();
const app = express();

export const logger = new Logger();
export const databaseManager = new DatabaseManager(logger);
export const middleware = new Middleware(logger, app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    let response: ApiResponse = {
        status: 200,
        message: `Snipbin Core v${require('../package.json').version} by ${require('../package.json').author} and contributors`
    }
    res.send(response);
});

import { router as v1 } from './routes/api/v1';
app.use('/api/v1', v1);

app.listen(process.env.PORT || 4000, async () => {
    logger.log('express', `Listening on ${process.env.HOSTNAME}:${process.env.PORT || 4000}.`);
    await databaseManager.authenticate()
        .then(() => logger.log('mongo', 'Connected to MongoDB.'))
        .catch(err => logger.log('mongo', 'ERROR: Could not connect to MongoDB.', err));
})