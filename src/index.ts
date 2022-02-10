import * as dotenv from 'dotenv';
import * as express from 'express';

import { ApiResponse } from './modules/types';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    let response: ApiResponse = {
        status: 200,
        message: `Snipbin Core v${require('../package.json').version} by ${require('../package.json').author}`
    }
    res.send(response);
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on ${process.env.HOSTNAME}:${process.env.PORT || 4000}.`)
})