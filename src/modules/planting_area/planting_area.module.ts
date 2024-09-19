import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantingArea } from './entities/planting_area.entity';
import { PlantingAreaController } from './planting_area.controller';
import { PlantingAreaService } from './planting_area.service';

@Module({
    imports: [TypeOrmModule.forFeature([PlantingArea])],
    controllers: [PlantingAreaController],
    providers: [PlantingAreaService],
})
export class PlantingAreaModule {}
