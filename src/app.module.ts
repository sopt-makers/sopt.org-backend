import { MemberModule } from './members/memberModule';
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
import { ProjectModule } from './projects/projectModule';
import { SemestersModule } from './semesters/semesters.module';
import { envValidationSchema } from 'src/configs/env.config';
import { ReviewsModule } from './reviews/reviews.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';

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
    ProjectModule,
    SemestersModule,
    ReviewsModule,
    AuthModule,
    FileModule,
    AboutSoptModule,
    MemberModule,
    StudyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
