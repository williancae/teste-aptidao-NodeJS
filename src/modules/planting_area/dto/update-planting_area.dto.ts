import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantingAreaDto } from './create-planting_area.dto';

export class UpdatePlantingAreaDto extends PartialType(CreatePlantingAreaDto) {}
