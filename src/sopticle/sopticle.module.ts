import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sopticle } from './entities/sopticle.entity';
import { SopticleLike } from './entities/sopticleLike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sopticle, SopticleLike])],
  controllers: [],
  providers: [],
})
export class SopticleModule {}
