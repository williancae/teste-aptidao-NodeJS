import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlantingAreaService } from './planting_area.service';
import { CreatePlantingAreaDto } from './dto/create-planting_area.dto';
import { UpdatePlantingAreaDto } from './dto/update-planting_area.dto';

@Controller('planting-area')
export class PlantingAreaController {
  constructor(private readonly plantingAreaService: PlantingAreaService) {}

  @Post()
  create(@Body() createPlantingAreaDto: CreatePlantingAreaDto) {
    return this.plantingAreaService.create(createPlantingAreaDto);
  }

  @Get()
  findAll() {
    return this.plantingAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantingAreaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantingAreaDto: UpdatePlantingAreaDto) {
    return this.plantingAreaService.update(+id, updatePlantingAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantingAreaService.remove(+id);
  }
}
