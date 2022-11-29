import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CooperationProject } from 'src/cooperation-projects/entities/cooperation-projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CooperationProjectsService {
  constructor(
    @InjectRepository(CooperationProject)
    private cooperationProjectsRepository: Repository<CooperationProject>,
  ) {}

  findAll(): Promise<CooperationProject[]> {
    return this.cooperationProjectsRepository.find({ order: { year: 'DESC' } });
  }
}
