import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutSopt } from './entities/aboutsopt.entity';
import { Activity } from './entities/activity.entity';
import { AboutSoptService } from './services/aboutsopt.service';
import { AboutSoptController } from './controllers/aboutsopt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AboutSopt,Activity])],
  providers: [AboutSoptService],
  controllers: [AboutSoptController],
})
export class AboutSoptModule {}