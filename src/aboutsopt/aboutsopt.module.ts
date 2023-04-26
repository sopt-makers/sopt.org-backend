import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutSopt } from './entities/aboutsopt.entity';
import { AboutSoptService } from './services/aboutsopt.service';
import { AboutSoptController } from './controllers/aboutsopt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AboutSopt])],
  providers: [AboutSoptService],
  controllers: [AboutSoptController],
})
export class AboutSoptModule {}
