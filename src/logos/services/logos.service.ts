import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logo } from 'src/logos/entities/logos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogosService {
  constructor(
    @InjectRepository(Logo) private logosRepository: Repository<Logo>,
  ) {}

  findAll(): Promise<Logo[]> {
    return this.logosRepository.find();
  }
}
