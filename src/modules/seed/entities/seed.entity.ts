import { PlantingArea } from 'src/modules/planting_area/entities/planting_area.entity';
import { BaseEntityHelper } from 'src/utils/base-entity-helper';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
    name: 'seeds',
    orderBy: {
        updatedAt: 'DESC',
    },
})
export class Seed extends BaseEntityHelper {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => PlantingArea, (plantingArea) => plantingArea.seed)
    plantingAreas: PlantingArea[];
}
