import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuralProducerService } from './rural_producer.service';
import { CreateRuralProducerDto } from './dto/create-rural_producer.dto';
import { UpdateRuralProducerDto } from './dto/update-rural_producer.dto';

@Controller('rural-producer')
export class RuralProducerController {
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @Post()
  create(@Body() createRuralProducerDto: CreateRuralProducerDto) {
    return this.ruralProducerService.create(createRuralProducerDto);
  }

  @Get()
  findAll() {
    return this.ruralProducerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ruralProducerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuralProducerDto: UpdateRuralProducerDto) {
    return this.ruralProducerService.update(+id, updateRuralProducerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruralProducerService.remove(+id);
  }
}
