import { Test, TestingModule } from '@nestjs/testing';
import { RuralProducerController } from './rural_producer.controller';
import { RuralProducerService } from './rural_producer.service';

describe('RuralProducerController', () => {
  let controller: RuralProducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuralProducerController],
      providers: [RuralProducerService],
    }).compile();

    controller = module.get<RuralProducerController>(RuralProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
