import { Test, TestingModule } from '@nestjs/testing';
import { PlantingAreaController } from './planting_area.controller';
import { PlantingAreaService } from './planting_area.service';

describe('PlantingAreaController', () => {
    let controller: PlantingAreaController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlantingAreaController],
            providers: [PlantingAreaService],
        }).compile();

        controller = module.get<PlantingAreaController>(PlantingAreaController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
