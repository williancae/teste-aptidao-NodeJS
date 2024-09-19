import { Injectable } from '@nestjs/common';
import { CreateRuralProducerDto } from './dto/create-rural_producer.dto';
import { UpdateRuralProducerDto } from './dto/update-rural_producer.dto';

@Injectable()
export class RuralProducerService {
  create(createRuralProducerDto: CreateRuralProducerDto) {
    return 'This action adds a new ruralProducer';
  }

  findAll() {
    return `This action returns all ruralProducer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ruralProducer`;
  }

  update(id: number, updateRuralProducerDto: UpdateRuralProducerDto) {
    return `This action updates a #${id} ruralProducer`;
  }

  remove(id: number) {
    return `This action removes a #${id} ruralProducer`;
  }
}
