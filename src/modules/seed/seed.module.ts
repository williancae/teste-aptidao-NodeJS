import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seed } from './entities/seed.entity';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([Seed])],
    controllers: [SeedController],
    providers: [SeedService],
})
export class SeedModule {}
