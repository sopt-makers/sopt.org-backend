import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sopticle } from './entities/sopticle.entity';
import { SopticleLike } from './entities/sopticleLike.entity';
import { SopticleController } from './controllers/sopticle.controller';
import { SopticleService } from './services/sopticle.service';
import { ScraperModule } from '../scraper/scraper.module';
import { SopticleAuthor } from './entities/sopticle-author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sopticle, SopticleLike, SopticleAuthor]),
    ScraperModule,
  ],
  controllers: [SopticleController],
  providers: [SopticleService],
})
export class SopticleModule {}
