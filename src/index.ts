import * as dotenv from 'dotenv';
import * as express from 'express';

import { ApiResponse } from './modules/types';
import DatabaseManager from './modules/databaseManager';
import Logger from './modules/logger';

dotenv.config();
const app = express();

const logger = new Logger();
const databaseManager = new DatabaseManager(logger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    let response: ApiResponse = {
        status: 200,
        message: `Snipbin Core v${require('../package.json').version} by ${require('../package.json').author} and contributors`
    }
    res.send(response);
});

import { router as v1 } from './routes/api/v1';
app.use('/api/v1', v1);

app.listen(process.env.PORT || 4000, async () => {
    logger.log('info', `Listening on ${process.env.HOSTNAME}:${process.env.PORT || 4000}.`);
    await databaseManager.authenticate();
})