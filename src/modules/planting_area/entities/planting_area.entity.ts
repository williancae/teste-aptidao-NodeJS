import { Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RuralProducer } from 'src/modules/rural_producer/entities/rural_producer.entity';
import { Seed } from 'src/modules/seed/entities/seed.entity';
import { BaseEntityHelper } from 'src/utils/base-entity-helper';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@ValidatorConstraint({ name: 'isCultivableAreaValid', async: false })
class IsCultivableAreaValid implements ValidatorConstraintInterface {
    validate(cultivableArea: number, args: ValidationArguments) {
        const plantingArea = args.object as PlantingArea;
        return plantingArea.totalArea != null && cultivableArea > plantingArea.totalArea;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Cultivable area must be greater than total area';
    }
}

@Entity({
    name: 'planting_areas',
    orderBy: {
        updatedAt: 'DESC',
    },
})
export class PlantingArea extends BaseEntityHelper {
    @Column()
    totalArea: number;

    @Column()
    @Validate(IsCultivableAreaValid)
    cultivableArea: number;

    @Column()
    vegetationArea: number;

    @ManyToOne(() => RuralProducer, (ruralProducer) => ruralProducer.plantingAreas)
    @JoinColumn()
    ruralProducer: RuralProducer;

    @ManyToOne(() => Seed, (seed) => seed.plantingAreas)
    @JoinColumn()
    seed: Seed;
}
