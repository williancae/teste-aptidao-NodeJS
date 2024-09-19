import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import databaseConfig from './database/config/database.config';
import { DatabaseSeed } from './database/database-seed';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { PlantingAreaModule } from './modules/planting_area/planting_area.module';
import { RuralProducerModule } from './modules/rural_producer/rural_producer.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig],
            envFilePath: ['.env'],
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (options: DataSourceOptions) => {
                return new DataSource(options).initialize();
            },
        }),
        PlantingAreaModule,
        RuralProducerModule,
        SeedModule,
    ],
    controllers: [AppController],
    providers: [AppService, DatabaseSeed],
})
export class AppModule {}
