import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutSopt } from './entities/aboutsopt.entity';
import { AboutSoptService } from './services/aboutsopt.service';
import { AboutSoptController } from './controllers/aboutsopt.controller';
import { CoreValue } from './entities/coreValue.entity';
import { MemberModule } from '../members/memberModule';
import { StudyModule } from '../study/study.module';
import { ProjectModule } from '../projects/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AboutSopt, CoreValue]),
    MemberModule,
    StudyModule,
    ProjectModule,
  ],
  providers: [AboutSoptService],
  controllers: [AboutSoptController],
})
export class AboutSoptModule {}
