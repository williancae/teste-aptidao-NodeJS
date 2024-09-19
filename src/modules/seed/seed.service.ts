import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOneOptions, ILike, Repository } from 'typeorm';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { Seed } from './entities/seed.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Seed)
        private repository: Repository<Seed>,
    ) {}

    async create(payload: CreateSeedDto): Promise<Seed> {
        const hasSeed = await this.repository.findOne({ where: { name: ILike(payload.name) } });
        if (hasSeed) {
            throw new NotFoundException('Semente já cadastrada');
        }

        return await this.repository.save(payload);
    }

    async findAll(): Promise<Seed[]> {
        return await this.repository.find();
    }

    async findOne(options: FindOneOptions<Seed>): Promise<NullableType<Seed>> {
        return await this.repository.findOne(options);
    }

    async findById(id: number): Promise<Seed> {
        const response = await this.repository.findOneBy({ id });
        if (!response) {
            throw new NotFoundException('Semente não encontrada');
        }
        return response;
    }

    async update(id: number, payload: UpdateSeedDto) {
        const hasSeed = await this.repository.findOne({ where: { name: ILike(payload.name) } });
        if (hasSeed) {
            throw new NotFoundException('Semente já cadastrada');
        }

        const seed = await this.findById(id);
        return await this.repository.save({ ...seed, ...payload });
    }

    async remove(id: number): Promise<void> {
        const seed = await this.findById(id);
        await this.repository.softRemove(seed);
    }
}
