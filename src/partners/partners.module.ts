import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/partners/entities/partners.entity';
import { PartnersService } from 'src/partners/services/partners.service';
import { PartnersController } from './controllers/partners.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  providers: [PartnersService],
  controllers: [PartnersController],
})
export class PartnersModule {}
