/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { Seed } from './entities/seed.entity';
import { SeedService } from './seed.service';

describe('SeedService', () => {
    let service: SeedService;
    let repository: Repository<Seed>;

    const mockRepository = {
        findOne: jest.fn(),
        find: jest.fn(),
        findOneBy: jest.fn(),
        save: jest.fn(),
    };

    const createOrUpdatePayload: CreateSeedDto = { name: 'Milho' };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SeedService,
                {
                    provide: getRepositoryToken(Seed),
                    useValue: mockRepository, // Mock direto do repositório
                },
            ],
        }).compile();

        service = module.get<SeedService>(SeedService);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks entre os testes
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new seed', async () => {
            mockRepository.findOne.mockResolvedValue(null); // Simula que não encontrou o Seed
            mockRepository.save.mockResolvedValue(createOrUpdatePayload as Seed);

            const result = await service.create(createOrUpdatePayload);

            expect(result).toEqual(createOrUpdatePayload);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { name: ILike(createOrUpdatePayload.name) } });
            expect(mockRepository.save).toHaveBeenCalledWith(createOrUpdatePayload);
        });

        it('should throw NotFoundException if seed already exists', async () => {
            mockRepository.findOne.mockResolvedValue(createOrUpdatePayload as Seed);

            await expect(service.create(createOrUpdatePayload)).rejects.toThrow(NotFoundException);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { name: ILike(createOrUpdatePayload.name) } });
            expect(mockRepository.save).not.toHaveBeenCalled();
        });
    });

    describe('findAll', () => {
        it('should return an array of seeds', async () => {
            const seedsArray = [{ name: 'Milho' }, { name: 'Trigo' }] as Seed[];
            mockRepository.find.mockResolvedValue(seedsArray);

            const result = await service.findAll();
            expect(result).toEqual(seedsArray);
            expect(mockRepository.find).toHaveBeenCalled();
        });

        it('should return an empty array if no seeds are found', async () => {
            mockRepository.find.mockResolvedValue([]);

            const result = await service.findAll();
            expect(result).toEqual([]);
            expect(mockRepository.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a seed if found', async () => {
            const seed = { name: 'Milho' } as Seed;
            const findOneOptions = { where: { name: 'Milho' } };
            mockRepository.findOne.mockResolvedValue(seed);

            const result = await service.findOne(findOneOptions);
            expect(result).toEqual(seed);
            expect(mockRepository.findOne).toHaveBeenCalledWith(findOneOptions);
        });

        it('should return null if no seed is found', async () => {
            const findOneOptions = { where: { name: 'Milho' } };
            mockRepository.findOne.mockResolvedValue(null);

            const result = await service.findOne(findOneOptions);
            expect(result).toBeNull();
            expect(mockRepository.findOne).toHaveBeenCalledWith(findOneOptions);
        });
    });

    describe('findById', () => {
        it('should return a seed if found', async () => {
            const seed = { id: 1, name: 'Milho' } as Seed;
            mockRepository.findOneBy.mockResolvedValue(seed);

            const result = await service.findById(1);
            expect(result).toEqual(seed);
            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
        });

        it('should throw NotFoundException if no seed is found', async () => {
            mockRepository.findOneBy.mockResolvedValue(null);

            await expect(service.findById(1)).rejects.toThrow(NotFoundException);
            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
        });
    });

    describe('update', () => {
        it('should throw NotFoundException if seed with the same name already exists', async () => {
            const id = 1;
            const updatePayload = { name: 'Trigo' } as UpdateSeedDto;

            // Mockando a função findOne para simular que já existe uma seed com o mesmo nome
            mockRepository.findOne.mockResolvedValue(updatePayload as Seed);

            // Mockando a função findById
            jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

            await expect(service.update(id, updatePayload)).rejects.toThrow(NotFoundException);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { name: ILike(updatePayload.name) } });

            // // Aqui verificamos se findById não foi chamado, já que a seed já existia
            expect(service.findById).not.toHaveBeenCalled();
            expect(mockRepository.save).not.toHaveBeenCalled();
        });
    });
});
