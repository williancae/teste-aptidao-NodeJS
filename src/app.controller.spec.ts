import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AppService,
                    useValue: {
                        getHello: jest.fn().mockResolvedValue('Hello World!'),
                        createDatabaseSeed: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();

        appController = app.get<AppController>(AppController);
        appService = app.get<AppService>(AppService);
    });

    describe('getHello', () => {
        it('should return "Hello World!"', async () => {
            const result = await appController.getHello();
            expect(result).toBe('Hello World!');
            expect(appService.getHello).toHaveBeenCalled();
        });
    });

    describe('createDatabaseSeed', () => {
        it('should call createDatabaseSeed method of AppService', async () => {
            await appController.createDatabaseSeed();
            expect(appService.createDatabaseSeed).toHaveBeenCalled();
        });
    });
});
