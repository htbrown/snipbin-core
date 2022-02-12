import { Sequelize, Model, DataTypes } from 'sequelize';

export default class DatabaseManager {
    sequelize: Sequelize;

    constructor() { 
        this.sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOSTNAME}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`);
    }

    async authenticate() {
        try {
            await this.sequelize.authenticate();
            console.log('Connected to PostgresSQL server.');
        } catch (err) {
            console.error('Unable to connect to PostgresSQL server:', err);
        }
    }

}