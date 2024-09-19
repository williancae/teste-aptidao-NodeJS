export type DatabaseConfig = {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: object;
    synchronize: boolean;
    logging: boolean;
};
