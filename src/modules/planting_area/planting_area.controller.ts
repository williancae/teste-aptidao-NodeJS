import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePlantingAreaDto } from './dto/create-planting_area.dto';
import { UpdatePlantingAreaDto } from './dto/update-planting_area.dto';
import { PlantingArea } from './entities/planting_area.entity';
import { PlantingAreaService } from './planting_area.service';

@ApiTags('Planting Area')
@Controller('planting-area')
export class PlantingAreaController {
    constructor(private readonly plantingAreaService: PlantingAreaService) {}

    @Post()
    async create(@Body() payload: CreatePlantingAreaDto): Promise<PlantingArea> {
        return await this.plantingAreaService.create(payload);
    }

    @Get()
    async findAll(): Promise<PlantingArea[]> {
        return await this.plantingAreaService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PlantingArea> {
        return await this.plantingAreaService.findById(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePlantingAreaDto: UpdatePlantingAreaDto): Promise<PlantingArea> {
        return await this.plantingAreaService.update(+id, updatePlantingAreaDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.plantingAreaService.remove(+id);
    }
}
