import { Injectable } from '@nestjs/common';
import { Sopticle } from '../entities/sopticle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SopticleLike } from '../entities/sopticleLike.entity';

@Injectable()
export class SopticleService {
  constructor(
    @InjectRepository(Sopticle)
    private readonly sopticleRepository: Repository<Sopticle>,
    @InjectRepository(SopticleLike)
    private readonly sopticleLikeRepository: Repository<SopticleLike>,
  ) {}
}
