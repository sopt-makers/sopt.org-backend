import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreValue } from '../entities/corevalue.entity';

@Injectable()
export class CoreValueService {
  constructor(
    @InjectRepository(CoreValue)
    private reviewsRepository: Repository<CoreValue>,
  ) {}
}