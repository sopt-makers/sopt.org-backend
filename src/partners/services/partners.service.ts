import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from 'src/partners/entities/partners.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner) private partnersRepository: Repository<Partner>,
  ) {}

  findAll(): Promise<Partner[]> {
    return this.partnersRepository.find();
  }
}
