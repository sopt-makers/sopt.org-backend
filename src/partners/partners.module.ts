import { Module } from '@nestjs/common';
import { PartnersController } from './controllers/partners.controller';

@Module({
  controllers: [PartnersController],
})
export class PartnersModule {}
