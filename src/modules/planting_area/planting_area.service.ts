import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOneOptions, Repository } from 'typeorm';
import { CreatePlantingAreaDto } from './dto/create-planting_area.dto';
import { UpdatePlantingAreaDto } from './dto/update-planting_area.dto';
import { PlantingArea } from './entities/planting_area.entity';

@Injectable()
export class PlantingAreaService {
    constructor(
        @InjectRepository(PlantingArea)
        private repository: Repository<PlantingArea>,
    ) {}

    async create(payload: CreatePlantingAreaDto): Promise<PlantingArea> {
        const { seedId, ruralProducerId, ...rest } = payload;
        const plantingArea = this.repository.create({
            ...rest,
            seed: { id: seedId },
            ruralProducer: { id: ruralProducerId },
        });
        return await this.repository.save(plantingArea);
    }

    async findOne(options: FindOneOptions<PlantingArea>): Promise<NullableType<PlantingArea>> {
        return await this.repository.findOne(options);
    }

    async findAll(): Promise<PlantingArea[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<PlantingArea> {
        const response = await this.repository.findOne({
            where: { id },
            relations: {
                seed: true,
                ruralProducer: true,
            },
        });
        if (!response) {
            throw new NotFoundException('Área de plantio não encontrada');
        }
        return response;
    }

    async update(id: number, payload: UpdatePlantingAreaDto): Promise<PlantingArea> {
        const plantingArea = await this.findById(id);
        return await this.repository.save({ ...plantingArea, ...payload });
    }

    async remove(id: number): Promise<void> {
        const plantingArea = await this.findById(id);
        await this.repository.softRemove(plantingArea);
    }
}
