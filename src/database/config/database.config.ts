import { registerAs } from '@nestjs/config';
import validateConfig from '@utils//validate-config';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { DatabaseConfig } from './database-config.type';

class EnvironmentVariablesValidator {
    @IsString()
    DATABASE_TYPE: string;

    @IsString()
    DATABASE_HOST: string;

    @IsInt()
    @Min(0)
    @Max(65535)
    DATABASE_PORT: number;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_NAME: string;

    @IsString()
    DATABASE_USER: string;

    @IsBoolean()
    @IsOptional()
    DATABASE_SYNCHRONIZE: boolean;

    @IsBoolean()
    @IsOptional()
    DATABASE_LOGGING: boolean;
}

export default registerAs<DatabaseConfig>('database', () => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        logging: process.env.DATABASE_LOGGING === 'true',
    };
});
