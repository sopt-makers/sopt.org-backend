import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';
import { MemberModule } from '../members/member.module';
import { StudyModule } from '../study/study.module';
import { ProjectModule } from '../projects/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    MemberModule,
    StudyModule,
    ProjectModule,
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
