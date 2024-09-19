import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlantingAreaDto } from './dto/create-planting_area.dto';
import { UpdatePlantingAreaDto } from './dto/update-planting_area.dto';
import { PlantingAreaController } from './planting_area.controller';
import { PlantingAreaService } from './planting_area.service';

const MockPlantingArea = {
    id: 1,
    totalArea: 100,
    cultivableArea: 50,
    vegetationArea: 30,
    seed: { id: 1, name: 'Milho' },
    ruralProducer: { id: 1, name: 'João Silva' },
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
};

describe('PlantingAreaController', () => {
    let controller: PlantingAreaController;
    let service: PlantingAreaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlantingAreaController],
            providers: [
                {
                    provide: PlantingAreaService,
                    useValue: {
                        create: jest.fn().mockResolvedValue(MockPlantingArea),
                        findAll: jest.fn().mockResolvedValue([MockPlantingArea]),
                        findById: jest.fn().mockResolvedValue(MockPlantingArea),
                        update: jest.fn().mockResolvedValue({ ...MockPlantingArea, totalArea: 150 }),
                        remove: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        })
            // Adicionar o ValidationPipe globalmente para o ambiente de testes
            .overrideProvider(APP_PIPE)
            .useValue(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
            .compile();

        controller = module.get<PlantingAreaController>(PlantingAreaController);
        service = module.get<PlantingAreaService>(PlantingAreaService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new planting area', async () => {
            const payload: CreatePlantingAreaDto = {
                totalArea: 100,
                cultivableArea: 50,
                vegetationArea: 30,
                seedId: 1,
                ruralProducerId: 1,
            };

            const result = await controller.create(payload);
            expect(result).toEqual(MockPlantingArea);
            expect(service.create).toHaveBeenCalledWith(payload);
        });
    });

    describe('findAll', () => {
        it('should return an array of planting areas', async () => {
            const result = await controller.findAll();
            expect(result).toEqual([MockPlantingArea]);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single planting area', async () => {
            const result = await controller.findOne('1');
            expect(result).toEqual(MockPlantingArea);
            expect(service.findById).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should update a planting area', async () => {
            const payload: UpdatePlantingAreaDto = {
                totalArea: 150,
                cultivableArea: 70,
                vegetationArea: 30,
            };

            const result = await controller.update('1', payload);
            expect(result.totalArea).toEqual(150);
            expect(service.update).toHaveBeenCalledWith(1, payload);
        });
    });

    describe('remove', () => {
        it('should remove a planting area', async () => {
            const result = await controller.remove('1');
            expect(result).toBeUndefined();
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
