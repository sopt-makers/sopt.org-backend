import { MembersModule } from './members/members.module';
import { StudyModule } from './study/study.module';
import { AboutSoptModule } from './aboutsopt/aboutsopt.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMFactory } from 'src/configs/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnersModule } from './partners/partners.module';
import { LogosModule } from './logos/logos.module';
import { CooperationProjectsModule } from './cooperation-projects/cooperation-projects.module';
import { ProjectsModule } from './projects/projects.module';
import { SemestersModule } from './semesters/semesters.module';
import { envValidationSchema } from 'src/configs/env.config';
import { ReviewsModule } from './reviews/reviews.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeORMFactory),
    PartnersModule,
    LogosModule,
    CooperationProjectsModule,
    ProjectsModule,
    SemestersModule,
    ReviewsModule,
    FileModule,
    AboutSoptModule,
    MembersModule,
    StudyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
