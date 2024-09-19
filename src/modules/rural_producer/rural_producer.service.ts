import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NullableType } from '@utils/types/nullable.type';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateRuralProducerDto } from './dto/create-rural_producer.dto';
import { UpdateRuralProducerDto } from './dto/update-rural_producer.dto';
import { RuralProducer } from './entities/rural_producer.entity';

@Injectable()
export class RuralProducerService {
    constructor(
        @InjectRepository(RuralProducer)
        private repository: Repository<RuralProducer>,
    ) {}

    async create(payload: CreateRuralProducerDto): Promise<RuralProducer> {
        const hasDocumet = await this.findOne({ where: { documentNumber: payload.documentNumber } });
        if (hasDocumet) {
            throw new ConflictException('Já existe um produtor rural com esse documento');
        }
        return await this.repository.save(payload);
    }

    async findAll(): Promise<RuralProducer[]> {
        return await this.repository.find();
    }

    async findOne(options: FindOneOptions<RuralProducer>): Promise<NullableType<RuralProducer>> {
        return await this.repository.findOne(options);
    }

    async findById(id: number) {
        const response = await this.repository.findOne({
            where: { id },
            relations: {
                plantingAreas: {
                    seed: true,
                },
            },
        });
        if (!response) {
            throw new NotFoundException('Produtor rural não encontrado');
        }
        return response;
    }

    async update(id: number, payload: UpdateRuralProducerDto): Promise<RuralProducer> {
        const hasDocumet = await this.findOne({ where: { documentNumber: payload.documentNumber } });
        if (hasDocumet && hasDocumet.id !== id) {
            throw new ConflictException('Já existe um produtor rural com esse documento');
        }
        const ruralProducer = await this.findById(id);
        return await this.repository.save({ ...ruralProducer, ...payload });
    }

    async remove(id: number): Promise<void> {
        const ruralProducer = await this.findById(id);
        await this.repository.softRemove(ruralProducer);
    }
}
