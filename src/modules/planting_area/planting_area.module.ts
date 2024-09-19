import { Module } from '@nestjs/common';
import { PlantingAreaService } from './planting_area.service';
import { PlantingAreaController } from './planting_area.controller';

@Module({
  controllers: [PlantingAreaController],
  providers: [PlantingAreaService],
})
export class PlantingAreaModule {}
