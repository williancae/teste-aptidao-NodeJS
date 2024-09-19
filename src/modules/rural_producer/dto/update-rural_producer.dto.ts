import { PartialType } from '@nestjs/swagger';
import { CreateRuralProducerDto } from './create-rural_producer.dto';

export class UpdateRuralProducerDto extends PartialType(CreateRuralProducerDto) {}
