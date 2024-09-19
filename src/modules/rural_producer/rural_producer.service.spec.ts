import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRuralProducerDto } from './dto/create-rural_producer.dto';
import { UpdateRuralProducerDto } from './dto/update-rural_producer.dto';
import { RuralProducer } from './entities/rural_producer.entity';
import { RuralProducerService } from './rural_producer.service';

// Mock data para os testes
const MockRuralProducer: Partial<RuralProducer> = {
    id: 1,
    documentNumber: '04054681131',
    name: 'Willian Caetano',
    farmName: 'Fazenda Jacaré',
    city: 'Campinorte',
    state: 'GO',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    plantingAreas: [],
} as RuralProducer;

const MockCreateRuralProducerDto: CreateRuralProducerDto = {
    documentNumber: '04054681131',
    name: 'Willian Caetano',
    farmName: 'Fazenda Jacaré',
    city: 'Campinorte',
    state: 'GO',
};

const MockUpdateRuralProducerDto: UpdateRuralProducerDto = {
    name: 'Willian Caetano Updated',
    city: 'Campinorte',
    state: 'GO',
};

describe('RuralProducerService', () => {
    let service: RuralProducerService;
    let repository: Repository<RuralProducer>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RuralProducerService,
                {
                    provide: getRepositoryToken(RuralProducer),
                    useValue: {
                        findOne: jest.fn(),
                        find: jest.fn(),
                        save: jest.fn(),
                        softRemove: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<RuralProducerService>(RuralProducerService);
        repository = module.get<Repository<RuralProducer>>(getRepositoryToken(RuralProducer));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new rural producer', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null); // Nenhum documento duplicado
            jest.spyOn(repository, 'save').mockResolvedValue(MockRuralProducer as RuralProducer);

            const result = await service.create(MockCreateRuralProducerDto);

            expect(result).toEqual(MockRuralProducer);
            expect(repository.save).toHaveBeenCalledWith(MockCreateRuralProducerDto);
        });

        it('should throw a ConflictException if the documentNumber already exists', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(MockRuralProducer as RuralProducer); // Documento já existe

            await expect(service.create(MockCreateRuralProducerDto)).rejects.toThrow(ConflictException);
        });
    });

    describe('findAll', () => {
        it('should return all rural producers', async () => {
            jest.spyOn(repository, 'find').mockResolvedValue([MockRuralProducer as RuralProducer]);

            const result = await service.findAll();

            expect(result).toEqual([MockRuralProducer]);
            expect(repository.find).toHaveBeenCalled();
        });
    });

    describe('findById', () => {
        it('should return a rural producer by id', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(MockRuralProducer as RuralProducer);

            const result = await service.findById(1);

            expect(result).toEqual(MockRuralProducer);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
                relations: {
                    plantingAreas: { seed: true },
                },
            });
        });

        it('should throw a NotFoundException if rural producer not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            await expect(service.findById(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a rural producer', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null); // Documento não duplicado
            jest.spyOn(service, 'findById').mockResolvedValue(MockRuralProducer as RuralProducer);
            jest.spyOn(repository, 'save').mockResolvedValue({
                ...MockRuralProducer,
                ...MockUpdateRuralProducerDto,
            } as RuralProducer);

            const result = await service.update(1, MockUpdateRuralProducerDto);

            expect(result).toEqual({ ...MockRuralProducer, ...MockUpdateRuralProducerDto });
            expect(repository.save).toHaveBeenCalledWith({ ...MockRuralProducer, ...MockUpdateRuralProducerDto });
        });

        it('should throw a ConflictException if another producer has the same documentNumber', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(MockRuralProducer as RuralProducer); // Documento já existe

            await expect(service.update(2, MockUpdateRuralProducerDto)).rejects.toThrow(ConflictException);
        });
    });

    describe('remove', () => {
        it('should remove a rural producer', async () => {
            jest.spyOn(service, 'findById').mockResolvedValue(MockRuralProducer as RuralProducer);
            jest.spyOn(repository, 'softRemove').mockResolvedValue(MockRuralProducer as RuralProducer);

            await service.remove(1);

            expect(service.findById).toHaveBeenCalledWith(1);
            expect(repository.softRemove).toHaveBeenCalledWith(MockRuralProducer);
        });

        it('should throw a NotFoundException if rural producer not found', async () => {
            jest.spyOn(service, 'findById').mockRejectedValue(new NotFoundException());

            await expect(service.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
