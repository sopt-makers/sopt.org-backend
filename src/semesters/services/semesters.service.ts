import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Semester } from 'src/semesters/entities/semesters.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SemestersService {
  constructor(
    @InjectRepository(Semester)
    private semestersRepository: Repository<Semester>,
  ) {}

  async findAll(limit: number, page: number): Promise<Semester[]> {
    const skip = limit * (page - 1);
    const semesters = await this.semestersRepository.find({
      order: { id: 'DESC' },
      skip: skip,
      take: limit,
    });

    return semesters;
  }

  async count(): Promise<number> {
    return await this.semestersRepository.count();
  }
}
