import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProducer } from './entities/rural_producer.entity';
import { RuralProducerController } from './rural_producer.controller';
import { RuralProducerService } from './rural_producer.service';

@Module({
    imports: [TypeOrmModule.forFeature([RuralProducer])],
    controllers: [RuralProducerController],
    providers: [RuralProducerService],
})
export class RuralProducerModule {}
