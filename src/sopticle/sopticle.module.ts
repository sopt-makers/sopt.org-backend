import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sopticle } from './entities/sopticle.entity';
import { SopticleLike } from './entities/sopticleLike.entity';
import { SopticleController } from './controllers/sopticle.controller';
import { SopticleService } from './services/sopticle.service';
import { PlaygroudModule } from '../internal/playground/playgroud.module';
import { ScraperModule } from '../scraper/scraper.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sopticle, SopticleLike]),
    PlaygroudModule,
    ScraperModule,
  ],
  controllers: [SopticleController],
  providers: [SopticleService],
})
export class SopticleModule {}
