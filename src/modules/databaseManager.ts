import Logger from './logger';
import * as mongoose from 'mongoose';

import SnipSchema from '../schemas/SnipSchema';

import { Models } from './types';

export default class DatabaseManager {
    private logger: Logger;
    public connection: mongoose.Connection;

    public models: Models = {};

    constructor(logger: Logger) {
        this.logger = logger;

        this.models.snip = mongoose.model('Snip', SnipSchema);
    }

    async authenticate() {
        await mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`);
        this.connection = mongoose.connection;
    }

    public static checkId(id: string): boolean {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return false;
        } else if (new mongoose.Types.ObjectId(id).toString() !== id) {
            return false;
        } else {
            return true;
        }
    }
}