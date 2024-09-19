import { Injectable } from '@nestjs/common';
import { DatabaseSeed } from './database/database-seed';

@Injectable()
export class AppService {
    constructor(private readonly databaseSeedService: DatabaseSeed) {}

    getHello(): string {
        return 'Hello World!';
    }

    async createDatabaseSeed(): Promise<void> {
        await this.databaseSeedService.createSeed();
    }
}
