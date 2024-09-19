import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

const mockResponse = [
    {
        name: 'Lavanda',
        id: 32,
        createdAt: new Date('2024-09-19T16:07:10.046Z'),
        updatedAt: new Date('2024-09-19T16:07:10.046Z'),
        deletedAt: null,
    },
    {
        name: 'Rosa',
        id: 33,
        createdAt: new Date('2024-09-20T16:07:10.046Z'),
        updatedAt: new Date('2024-09-20T16:07:10.046Z'),
        deletedAt: null,
    },
];

describe('SeedController', () => {
    let controller: SeedController;
    let service: SeedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SeedController],
            providers: [
                {
                    provide: SeedService,
                    useValue: {
                        create: jest.fn().mockResolvedValue(mockResponse[0]),
                        findAll: jest.fn().mockResolvedValue(mockResponse),
                        findById: jest.fn().mockImplementation((id: number) => {
                            const seed = mockResponse.find((item) => item.id === id);
                            return Promise.resolve(seed || null); // Retorna null se não encontrado
                        }),
                        update: jest.fn().mockImplementation((id: number, payload: UpdateSeedDto) => {
                            const seed = mockResponse.find((item) => item.id === id);
                            if (!seed) throw new NotFoundException('Semente não encontrada');
                            return Promise.resolve({ ...seed, ...payload });
                        }),
                        remove: jest.fn().mockImplementation((id: number) => {
                            const seed = mockResponse.find((item) => item.id === id);
                            if (!seed) throw new NotFoundException('Semente não encontrada');
                            return Promise.resolve();
                        }),
                    },
                },
            ],
        }).compile();

        controller = module.get<SeedController>(SeedController);
        service = module.get<SeedService>(SeedService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new seed', async () => {
            const payload: CreateSeedDto = {
                name: 'Lavanda',
            };
            const result = mockResponse[0];

            expect(await controller.create(payload)).toEqual(result);
            expect(service.create).toHaveBeenCalledWith(payload);
        });
    });

    describe('findAll', () => {
        it('should return an array of seeds', async () => {
            expect(await controller.findAll()).toEqual(mockResponse);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single seed', async () => {
            const result = mockResponse[0];

            // Simula encontrar a semente de id 32
            expect(await controller.findOne('32')).toEqual(result);
            expect(service.findById).toHaveBeenCalledWith(32);
        });

        it('should throw an error if seed not found', async () => {
            // Simula o lançamento da exceção NotFoundException pelo serviço
            jest.spyOn(service, 'findById').mockImplementation(() => {
                throw new NotFoundException('Semente não encontrada');
            });

            await expect(controller.findOne('32')).rejects.toThrow(NotFoundException);
            expect(service.findById).toHaveBeenCalledWith(32);
        });
    });

    describe('update', () => {
        it('should update a seed', async () => {
            const payload: UpdateSeedDto = {
                name: 'Lavanda Updated',
            };
            const result = mockResponse[0];
            result.name = 'Lavanda Updated';

            expect(await controller.update('32', payload)).toEqual(result);
            expect(service.update).toHaveBeenCalledWith(32, payload);
        });

        it('should throw an error if seed not found', async () => {
            const payload: UpdateSeedDto = {
                name: 'Lavanda Updated',
            };

            jest.spyOn(service, 'update').mockImplementation(() => {
                throw new NotFoundException('Semente não encontrada');
            });

            await expect(controller.update('999', payload)).rejects.toThrow(NotFoundException);
            expect(service.update).toHaveBeenCalledWith(999, payload);
        });
    });

    describe('remove', () => {
        it('should remove a seed', async () => {
            await expect(controller.remove('32')).resolves.toBeUndefined();
            expect(service.remove).toHaveBeenCalledWith(32);
        });

        it('should throw an error if seed not found', async () => {
            jest.spyOn(service, 'remove').mockImplementation(() => {
                throw new NotFoundException('Semente não encontrada');
            });

            await expect(controller.remove('999')).rejects.toThrow('Semente não encontrada');
            expect(service.remove).toHaveBeenCalledWith(999);
        });
    });
});
