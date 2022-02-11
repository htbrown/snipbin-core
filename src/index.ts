import * as dotenv from 'dotenv';
import * as express from 'express';

import { ApiResponse } from './modules/types';

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    let response: ApiResponse = {
        status: 200,
        message: `Snipbin Core v${require('../package.json').version} by ${require('../package.json').author}`
    }
    res.send(response);
});

import { router as v1 } from './routes/api/v1';
app.use('/api/v1', v1);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on ${process.env.HOSTNAME}:${process.env.PORT || 4000}.`)
})