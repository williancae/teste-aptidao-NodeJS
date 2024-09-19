import { PartialType } from '@nestjs/mapped-types';
import { CreateRuralProducerDto } from './create-rural_producer.dto';

export class UpdateRuralProducerDto extends PartialType(CreateRuralProducerDto) {}
