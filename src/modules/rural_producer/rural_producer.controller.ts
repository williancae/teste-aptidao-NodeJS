import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRuralProducerDto } from './dto/create-rural_producer.dto';
import { UpdateRuralProducerDto } from './dto/update-rural_producer.dto';
import { RuralProducer } from './entities/rural_producer.entity';
import { RuralProducerService } from './rural_producer.service';

@ApiTags('Rural Producer')
@Controller('rural-producer')
export class RuralProducerController {
    constructor(private readonly ruralProducerService: RuralProducerService) {}

    @Post()
    async create(@Body() payload: CreateRuralProducerDto): Promise<RuralProducer> {
        return await this.ruralProducerService.create(payload);
    }

    @Get()
    async findAll(): Promise<RuralProducer[]> {
        return await this.ruralProducerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<RuralProducer> {
        return await this.ruralProducerService.findById(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateRuralProducerDto: UpdateRuralProducerDto,
    ): Promise<RuralProducer> {
        return await this.ruralProducerService.update(+id, updateRuralProducerDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.ruralProducerService.remove(+id);
    }
}
