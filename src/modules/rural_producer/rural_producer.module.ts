import { Module } from '@nestjs/common';
import { RuralProducerService } from './rural_producer.service';
import { RuralProducerController } from './rural_producer.controller';

@Module({
  controllers: [RuralProducerController],
  providers: [RuralProducerService],
})
export class RuralProducerModule {}
