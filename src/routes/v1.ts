import { ApiResponse } from '../modules/types';

import { Router } from 'express';
export let router = Router();

import { databaseManager, logger } from '../index';

router.get('/', (req, res) => {
    let response: ApiResponse = {
        status: 200,
        message: 'Snipbin Core API v1'
    };
    res.send(response);
});

// Snip Routes (GET, POST)

router.route('/snip')
.get(async (req, res) => {
    let result: ApiResponse;

    try {
        if (!req.query.id) {
            result = { status: 200, data: await databaseManager.models.snip.find().exec() };
        } else if (databaseManager.checkId(req.query.id.toString())) {
            result = { status: 200, data: await databaseManager.models.snip.find({ _id: req.query.id }).exec() };
        } else {
            result = { status: 400, error: true, data: 'Invalid snip ID' };
            res.status(400);
        }
    } catch (err) {
        result = { status: 500, error: true, data: err.message };
        res.status(500);
        logger.log('express', 'ERROR: Something went wrong while returning a result.', err);
    }

    res.send(result);
})
.post((req, res) => {
    let result: ApiResponse;
    if (!req.query.name) {
        result = { status: 400, error: true, data: 'No name provided' };
        res.status(400);
        res.send(result);
        return;
    }

    if (req.query.user && !databaseManager.checkId(req.query.user.toString())) {
        result = { status: 400, error: true, data: 'Invalid user ID' };
        res.status(400);
        res.send(result);
        return;
    }

    let NewSnip = new databaseManager.models.snip({
        name: req.query.name,
        content: req.query.content || '',
        language: req.query.language || 'none',
        user: req.query.user,
        dateCreated: Date.now(),
        dateModified: Date.now()
    });

    NewSnip.save((err: Error, snip: any) => {
        if (err) {
            result = { status: 500, error: true, data: err.message };
            res.status(500);
        }

        result = { status: 200, data: snip, message: 'Created new snip' }
        res.send(result);
    });
});

// Tag Routes (GET, POST)

router.route('/tag')
.get((req, res) => {
    res.send('to be implemented');
})
.post((req, res) => {
    res.send('to be implemented');
});