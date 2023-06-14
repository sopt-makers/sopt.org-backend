import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberModule } from './members/memberModule';
import { StudyModule } from './study/study.module';
import { AboutSoptModule } from './aboutsopt/aboutsopt.module';
import { typeORMFactory } from 'src/configs/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnersModule } from './partners/partners.module';
import { LogosModule } from './logos/logos.module';
import { CooperationProjectsModule } from './cooperation-projects/cooperation-projects.module';
import { ProjectModule } from './projects/project.module';
import { SemestersModule } from './semesters/semesters.module';
import { envValidationSchema } from 'src/configs/env.config';
import { ReviewsModule } from './reviews/reviews.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './common/cache';
import { SopticleModule } from './sopticle/sopticle.module';
import { InternalServiceModule } from './internal/internalService.module';
import { ScraperModule } from './scraper/scraper.module';
import { AppLoggerMiddleware } from './common/middlewares/request-logger.middleware';

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
    CacheModule.forRoot(),
    SopticleModule,
    InternalServiceModule,
    ScraperModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
