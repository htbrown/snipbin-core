import Logger from './logger';

export default class DatabaseManager {
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }
}