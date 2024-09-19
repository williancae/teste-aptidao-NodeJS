import { Test, TestingModule } from '@nestjs/testing';
import { CreateRuralProducerDto } from './dto/create-rural_producer.dto';
import { UpdateRuralProducerDto } from './dto/update-rural_producer.dto';
import { RuralProducer } from './entities/rural_producer.entity';
import { RuralProducerController } from './rural_producer.controller';
import { RuralProducerService } from './rural_producer.service';

// Mock data para testes
const MockRuralProducer = {
    id: 1,
    documentNumber: '04054681131', // Número de CPF sem formatação
    name: 'Willian Caetano',
    farmName: 'Fazenda Jacaré',
    city: 'Campinorte',
    state: 'GO',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
};

const MockCreateRuralProducerDto: CreateRuralProducerDto = {
    documentNumber: '040.546.811-31', // CPF com formatação para testar a transformação
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

const MockFindOneResponse = {
    id: 6,
    createdAt: new Date('2024-09-19T14:24:44.995Z'),
    updatedAt: new Date('2024-09-19T14:24:44.995Z'),
    documentNumber: '52877407004',
    name: 'José da Silva',
    farmName: 'Fazenda José Silva - MS',
    city: 'Campo Grande',
    state: 'MS',
    plantingAreas: [
        {
            id: 8,
            createdAt: new Date('2024-09-19T14:24:44.999Z'),
            updatedAt: new Date('2024-09-19T14:24:44.999Z'),
            totalArea: 100,
            cultivableArea: 70,
            vegetationArea: 20,
            seed: {
                id: 31,
                createdAt: new Date('2024-09-19T14:24:44.970Z'),
                updatedAt: new Date('2024-09-19T14:24:44.970Z'),
                name: 'Sorgo',
                __entity: 'Seed',
            },
            __entity: 'PlantingArea',
        },
    ],
    __entity: 'RuralProducer',
};

describe('RuralProducerController', () => {
    let controller: RuralProducerController;
    let service: RuralProducerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RuralProducerController],
            providers: [
                {
                    provide: RuralProducerService,
                    useValue: {
                        create: jest.fn().mockResolvedValue(MockRuralProducer),
                        findAll: jest.fn().mockResolvedValue([MockRuralProducer]),
                        findById: jest.fn().mockResolvedValue(MockRuralProducer),
                        update: jest.fn().mockResolvedValue({ ...MockRuralProducer, ...MockUpdateRuralProducerDto }),
                        remove: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();

        controller = module.get<RuralProducerController>(RuralProducerController);
        service = module.get<RuralProducerService>(RuralProducerService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new rural producer and format documentNumber correctly', async () => {
            const transformedDto = { ...MockCreateRuralProducerDto }; // CPF já formatado
            await controller.create(MockCreateRuralProducerDto);
            expect(service.create).toHaveBeenCalledWith(transformedDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of rural producers', async () => {
            const result = await controller.findAll();
            expect(result).toEqual([MockRuralProducer]);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single rural producer', async () => {
            jest.spyOn(service, 'findById').mockResolvedValue(MockFindOneResponse as RuralProducer);
            const result = await controller.findOne('6');
            expect(result).toEqual(MockFindOneResponse);
            expect(service.findById).toHaveBeenCalledWith(6);
        });
    });

    describe('update', () => {
        it('should update a rural producer', async () => {
            const result = await controller.update('1', MockUpdateRuralProducerDto);
            expect(result).toEqual({ ...MockRuralProducer, ...MockUpdateRuralProducerDto });
            expect(service.update).toHaveBeenCalledWith(1, MockUpdateRuralProducerDto);
        });
    });

    describe('remove', () => {
        it('should remove a rural producer', async () => {
            const result = await controller.remove('1');
            expect(result).toBeUndefined();
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
