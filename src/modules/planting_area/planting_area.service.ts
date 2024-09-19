import { Injectable } from '@nestjs/common';
import { CreatePlantingAreaDto } from './dto/create-planting_area.dto';
import { UpdatePlantingAreaDto } from './dto/update-planting_area.dto';

@Injectable()
export class PlantingAreaService {
  create(createPlantingAreaDto: CreatePlantingAreaDto) {
    return 'This action adds a new plantingArea';
  }

  findAll() {
    return `This action returns all plantingArea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plantingArea`;
  }

  update(id: number, updatePlantingAreaDto: UpdatePlantingAreaDto) {
    return `This action updates a #${id} plantingArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} plantingArea`;
  }
}
