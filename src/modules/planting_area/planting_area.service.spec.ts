import { Test, TestingModule } from '@nestjs/testing';
import { PlantingAreaService } from './planting_area.service';

describe('PlantingAreaService', () => {
  let service: PlantingAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantingAreaService],
    }).compile();

    service = module.get<PlantingAreaService>(PlantingAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
