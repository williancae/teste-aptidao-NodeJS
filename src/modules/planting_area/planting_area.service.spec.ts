import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PlantingArea } from './entities/planting_area.entity';
import { PlantingAreaService } from './planting_area.service';

const MockCreateOrUpdate = {
    totalArea: 100,
    cultivableArea: 50,
    vegetationArea: 30,
    seedId: 1,
    ruralProducerId: 1,
};

const MockResponseFindAll: DeepPartial<PlantingArea>[] = [
    {
        id: 8,
        createdAt: new Date('2024-09-19T14:24:44.999Z'),
        updatedAt: new Date('2024-09-19T14:24:44.999Z'),
        totalArea: 100,
        cultivableArea: 70,
        vegetationArea: 20,
        seed: { id: 1, name: 'Seed1', createdAt: new Date(), updatedAt: new Date() },
        ruralProducer: {
            id: 1,
            name: 'Producer1',
            documentNumber: '123456789',
            farmName: 'Farm1',
            city: 'City1',
            state: 'State1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        deletedAt: null,
    },
    {
        id: 7,
        createdAt: new Date('2024-09-19T14:24:44.999Z'),
        updatedAt: new Date('2024-09-19T14:24:44.999Z'),
        totalArea: 100,
        cultivableArea: 30,
        vegetationArea: 10,
        seed: { id: 2, name: 'Seed2', createdAt: new Date(), updatedAt: new Date() },
        ruralProducer: {
            id: 2,
            name: 'Producer2',
            documentNumber: '987654321',
            farmName: 'Farm2',
            city: 'City2',
            state: 'State2',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        deletedAt: null,
    },
];

const MockResponseFindOne: DeepPartial<PlantingArea> = {
    id: 6,
    createdAt: new Date('2024-09-19T14:24:44.999Z'),
    updatedAt: new Date('2024-09-19T14:24:44.999Z'),
    totalArea: 100,
    cultivableArea: 50,
    vegetationArea: 30,
    seed: {
        id: 29,
        createdAt: new Date('2024-09-19T14:24:44.967Z'),
        updatedAt: new Date('2024-09-19T14:24:44.967Z'),
        name: 'Milho',
        __entity: 'Seed',
    },
    ruralProducer: {
        id: 4,
        createdAt: new Date('2024-09-19T14:24:44.987Z'),
        updatedAt: new Date('2024-09-19T14:24:44.987Z'),
        documentNumber: '54152305134',
        name: 'João da Silva',
        farmName: 'Fazenda João Silva - SP',
        city: 'São Paulo',
        state: 'SP',
        __entity: 'RuralProducer',
    },
    __entity: 'PlantingArea',
};

describe('PlantingAreaService', () => {
    let service: PlantingAreaService;
    let repository: Repository<PlantingArea>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlantingAreaService,
                {
                    provide: getRepositoryToken(PlantingArea),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                        softRemove: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<PlantingAreaService>(PlantingAreaService);
        repository = module.get<Repository<PlantingArea>>(getRepositoryToken(PlantingArea));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new planting area', async () => {
            const createSpy = jest.spyOn(repository, 'create').mockReturnValue(MockResponseFindOne as PlantingArea);
            const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue({
                ...MockResponseFindOne,
                seed: { id: MockResponseFindOne.seed.id },
                ruralProducer: { id: MockResponseFindOne.ruralProducer.id },
            } as PlantingArea);

            await service.create(MockCreateOrUpdate);

            // // Remove as propriedades seedId e ruralProducerId, pois elas são transformadas em objetos
            expect(createSpy).toHaveBeenCalledWith({
                totalArea: MockCreateOrUpdate.totalArea,
                cultivableArea: MockCreateOrUpdate.cultivableArea,
                vegetationArea: MockCreateOrUpdate.vegetationArea,
                seed: { id: MockCreateOrUpdate.seedId },
                ruralProducer: { id: MockCreateOrUpdate.ruralProducerId },
            });

            expect(saveSpy).toHaveBeenCalledWith(MockResponseFindOne as PlantingArea);
        });
    });

    describe('findAll', () => {
        it('should return all planting areas', async () => {
            jest.spyOn(repository, 'find').mockResolvedValue(MockResponseFindAll as PlantingArea[]);

            const result = await service.findAll();

            expect(result).toEqual(MockResponseFindAll);
            expect(repository.find).toHaveBeenCalled();
        });
    });

    describe('findById', () => {
        it('should return a planting area by id', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(MockResponseFindOne as PlantingArea);

            const result = await service.findById(6);

            expect(result).toEqual(MockResponseFindOne);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: 6 },
                relations: {
                    seed: true,
                    ruralProducer: true,
                },
            });
        });

        it('should throw a NotFoundException if planting area not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            await expect(service.findById(6)).rejects.toThrow(NotFoundException);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: 6 },
                relations: {
                    seed: true,
                    ruralProducer: true,
                },
            });
        });
    });

    describe('update', () => {
        it('should update a planting area', async () => {
            jest.spyOn(service, 'findById').mockResolvedValue(MockResponseFindOne as PlantingArea);
            jest.spyOn(repository, 'save').mockResolvedValue({
                ...MockResponseFindOne,
                ...MockCreateOrUpdate,
            } as DeepPartial<PlantingArea> & PlantingArea);

            const result = await service.update(6, MockCreateOrUpdate);

            expect(result).toEqual({ ...MockResponseFindOne, ...MockCreateOrUpdate });
            expect(service.findById).toHaveBeenCalledWith(6);
            expect(repository.save).toHaveBeenCalledWith({ ...MockResponseFindOne, ...MockCreateOrUpdate });
        });

        it('should throw a NotFoundException if planting area not found', async () => {
            jest.spyOn(service, 'findById').mockRejectedValue(new NotFoundException());

            await expect(service.update(6, MockCreateOrUpdate)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a planting area', async () => {
            jest.spyOn(service, 'findById').mockResolvedValue(MockResponseFindOne as PlantingArea);
            const softRemoveSpy = jest
                .spyOn(repository, 'softRemove')
                .mockResolvedValue(MockResponseFindOne as PlantingArea);

            await service.remove(6);

            expect(service.findById).toHaveBeenCalledWith(6);
            expect(softRemoveSpy).toHaveBeenCalledWith(MockResponseFindOne);
        });

        it('should throw a NotFoundException if planting area not found', async () => {
            jest.spyOn(service, 'findById').mockRejectedValue(new NotFoundException());

            await expect(service.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
