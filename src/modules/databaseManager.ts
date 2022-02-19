import { Sequelize, Model, DataTypes } from 'sequelize';
import Logger from './logger';

export default class DatabaseManager {
    private sequelize: Sequelize;
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
        this.sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOSTNAME}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`, {
            logging: msg => this.logger.log('postgres', msg)
        });
    }

    async authenticate() {
        try {
            await this.sequelize.authenticate();
            this.logger.log('postgres', 'Connected to PostgresSQL server.');
        } catch (err) {
            this.logger.log('postgres', `ERROR: Unable to connect to PostgresSQL server:`, err);
        }
    }

}