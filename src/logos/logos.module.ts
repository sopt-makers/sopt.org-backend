import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logo } from 'src/logos/entities/logos.entity';
import { LogosController } from 'src/logos/controllers/logos.controller';
import { LogosService } from 'src/logos/services/logos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logo])],
  providers: [LogosService],
  controllers: [LogosController],
})
export class LogosModule {}
