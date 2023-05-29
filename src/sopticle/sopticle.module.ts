import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sopticle } from './entities/sopticle.entity';
import { SopticleLike } from './entities/sopticleLike.entity';
import { SopticleController } from './controllers/sopticle.controller';
import { SopticleService } from './services/sopticle.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sopticle, SopticleLike])],
  controllers: [SopticleController],
  providers: [SopticleService],
})
export class SopticleModule {}