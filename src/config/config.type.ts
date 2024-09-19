import { DatabaseConfig } from '../database/config/database-config.type';
import { AppConfig } from './app.config';

export type AllConfigType = {
    app: AppConfig;
    database: DatabaseConfig;
};
