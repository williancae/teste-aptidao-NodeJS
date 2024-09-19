import { PlantingAreaService } from '@modules/planting_area/planting_area.service';
import { RuralProducerService } from '@modules/rural_producer/rural_producer.service';
import { SeedService } from '@modules/seed/seed.service';
import { Injectable } from '@nestjs/common';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class DatabaseSeed {
    constructor(
        private readonly plantingAreaService: PlantingAreaService,
        private readonly ruralProducerService: RuralProducerService,
        private readonly seedService: SeedService,
    ) {}

    async createSeed() {
        // Create seeds
        const seedIds = await Promise.all([
            this.seedService.create({ name: 'Milho' }),
            this.seedService.create({ name: 'Soja' }),
            this.seedService.create({ name: 'Sorgo' }),
        ]);

        // Create rural producers
        const ruralProducersIds = await Promise.all([
            this.ruralProducerService.create({
                name: 'João da Silva',
                documentNumber: cpf.generate(),
                city: 'São Paulo',
                farmName: 'Fazenda João Silva - SP',
                state: 'SP',
            }),
            this.ruralProducerService.create({
                name: 'Maria da Silva',
                documentNumber: cpf.generate(),
                city: 'Goiania',
                farmName: 'Fazenda Maria Silva - GO',
                state: 'GO',
            }),
            this.ruralProducerService.create({
                name: 'José da Silva',
                documentNumber: cpf.generate(),
                city: 'Campo Grande',
                farmName: 'Fazenda José Silva - MS',
                state: 'MS',
            }),
        ]);

        // Create planting areas
        await Promise.all([
            this.plantingAreaService.create({
                cultivableArea: 50,
                totalArea: 100,
                vegetationArea: 30,
                ruralProducerId: ruralProducersIds[0].id,
                seedId: seedIds[0].id,
            }),
            this.plantingAreaService.create({
                cultivableArea: 30,
                totalArea: 100,
                vegetationArea: 10,
                ruralProducerId: ruralProducersIds[1].id,
                seedId: seedIds[1].id,
            }),
            this.plantingAreaService.create({
                cultivableArea: 70,
                totalArea: 100,
                vegetationArea: 20,
                ruralProducerId: ruralProducersIds[2].id,
                seedId: seedIds[2].id,
            }),
        ]);
    }
}
