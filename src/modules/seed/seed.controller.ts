import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { Seed } from './entities/seed.entity';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @Post()
    async create(@Body() payload: CreateSeedDto): Promise<Seed> {
        return this.seedService.create(payload);
    }

    @Get()
    async findAll(): Promise<Seed[]> {
        return this.seedService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Seed> {
        return this.seedService.findById(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSeedDto: UpdateSeedDto): Promise<Seed> {
        return this.seedService.update(+id, updateSeedDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.seedService.remove(+id);
    }
}
