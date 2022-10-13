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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeORMFactory),
    PartnersModule,
    LogosModule,
    CooperationProjectsModule,
    ProjectsModule,
    SemestersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
