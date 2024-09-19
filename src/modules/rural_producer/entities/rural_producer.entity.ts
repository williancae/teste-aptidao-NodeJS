import { PlantingArea } from '@modules/planting_area/entities/planting_area.entity';
import { BaseEntityHelper } from '@utils//base-entity-helper';
import { AfterUpdate, Column, Entity, OneToMany } from 'typeorm';

@Entity({
    name: 'rural_producers',
    orderBy: {
        updatedAt: 'DESC',
    },
})
export class RuralProducer extends BaseEntityHelper {
    @Column()
    documentNumber: string;

    @Column()
    name: string;

    @Column()
    farmName: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @OneToMany(() => PlantingArea, (plantingArea) => plantingArea.ruralProducer)
    plantingAreas: PlantingArea[];

    @AfterUpdate()
    removeSpecialCharactersOfDocuments(): void {
        this.documentNumber = this.documentNumber.replace(/[^\d]+/g, '');
    }
}
