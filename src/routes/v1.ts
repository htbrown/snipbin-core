import { ApiResponse } from '../modules/types';
import { logger, databaseManager } from "../index";
import DatabaseManager from '../modules/databaseManager';
import Utilities from '../modules/utilities';

import { Router } from 'express';
export let router = Router();

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
        } else if (DatabaseManager.checkId(req.query.id.toString())) {
            result = { status: 200, data: await databaseManager.models.snip.find({ _id: req.query.id }).exec() };
        } else {
            Utilities.sendError(400, new Error('Invalid snip ID'), res);
            return;
        }
    } catch (err) {
        Utilities.sendError(500, err, res);
        return;
    }

    res.send(result);
})
.post((req, res) => {
    let result: ApiResponse;
    if (!req.query.name) return Utilities.sendError(400, new Error('No name provided'), res);
    if (req.query.user && !DatabaseManager.checkId(req.query.user.toString())) return Utilities.sendError(400, new Error('Invalid user ID'), res);

    let NewSnip = new databaseManager.models.snip({
        name: req.query.name,
        content: req.query.content || '',
        language: req.query.language || 'none',
        user: req.query.user,
        dateCreated: Date.now(),
        dateModified: Date.now()
    });

    NewSnip.save((err: Error, snip: any) => {
        if (err) return Utilities.sendError(500, err, res);

        result = { status: 200, data: snip, message: `Created new snip with ID ${snip._id}` }
        res.send(result);

        logger.log('mongo', `Created new snip with ID ${snip._id}`);
    });
})
.delete(async (req, res) => {
    let result: ApiResponse;
    if (!req.query.id) return Utilities.sendError(400, new Error('No ID provided'), res);
    if (!DatabaseManager.checkId(req.query.id.toString())) return Utilities.sendError(400, new Error('Invalid snip ID'), res);
    if ((await databaseManager.models.snip.find({ _id: req.query.id }).exec()).length < 1) return Utilities.sendError(404, new Error('No snip with ID found'), res);

    databaseManager.models.snip.deleteOne({ _id: req.query.id }, err => {
        if (err) return Utilities.sendError(500, err, res);

        result = { status: 200, message: `Deleted snip with ID ${req.query.id}` };
        res.send(result);

        logger.log('mongo', `Deleted snip with ID ${req.query.id}`);
    })
});