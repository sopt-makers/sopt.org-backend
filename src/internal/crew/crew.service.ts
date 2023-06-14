import { Injectable } from '@nestjs/common';
import { CrewRepository } from './crew.repository';

@Injectable()
export class CrewService {
  constructor(private readonly crewRepository: CrewRepository) {}
}
