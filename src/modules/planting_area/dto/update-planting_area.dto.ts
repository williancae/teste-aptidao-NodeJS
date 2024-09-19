import { PartialType } from '@nestjs/swagger';
import { CreatePlantingAreaDto } from './create-planting_area.dto';

export class UpdatePlantingAreaDto extends PartialType(CreatePlantingAreaDto) {}
