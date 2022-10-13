import { Module } from '@nestjs/common';
import { LogosController } from 'src/logos/controllers/logos.controller';

@Module({
  controllers: [LogosController],
})
export class LogosModule {}
