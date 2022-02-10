import { ApiResponse } from '../../modules/types';

import { Router } from 'express';
export let router = Router();

router.get('/', (req, res) => {
    let response: ApiResponse = {
        status: 200,
        message: 'Snipbin Core API v1'
    };
    res.send(response);
});