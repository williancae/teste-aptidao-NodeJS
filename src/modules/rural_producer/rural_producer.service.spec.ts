import { Test, TestingModule } from '@nestjs/testing';
import { RuralProducerService } from './rural_producer.service';

describe('RuralProducerService', () => {
    let service: RuralProducerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RuralProducerService],
        }).compile();

        service = module.get<RuralProducerService>(RuralProducerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
