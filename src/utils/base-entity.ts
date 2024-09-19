import { Exclude, instanceToPlain } from 'class-transformer';
import {
    AfterLoad,
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class BaseEntityHelper extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        type: `timestamp`,
        default: () => `CURRENT_TIMESTAMP`,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: `timestamp`,
        default: () => `CURRENT_TIMESTAMP`,
    })
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

    __entity?: string;

    @AfterLoad()
    setEntityName() {
        this.__entity = this.constructor.name;
    }

    toJSON() {
        return instanceToPlain(this);
    }
}
