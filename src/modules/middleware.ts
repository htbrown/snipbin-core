import Logger from "./logger";
import * as express from 'express';

export default class Middleware {
    private app: express.Application;
    private logger: Logger;

    constructor(logger: Logger, app: express.Application) {
        this.app = app;
        this.logger = logger;

        app.use((req, res, next) => this.logging(req, res, next));
    }

    private logging(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.logger.log('express', `${req.method} ${req.url} (${req.ip})`);
        next();
    }
}