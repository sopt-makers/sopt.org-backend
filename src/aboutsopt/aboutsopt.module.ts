import { CoreValueController } from './controllers/corevalue.controller';
import { CoreValueService } from './services/corevalue.service';
import { ActivityService } from './services/activity.service';
import { CoreValue } from './entities/corevalue.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutSopt } from './entities/aboutsopt.entity';
import { Activity } from './entities/activity.entity';
import { AboutSoptService } from './services/aboutsopt.service';
import { AboutSoptController } from './controllers/aboutsopt.controller';
import { ActivityController } from './controllers/activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AboutSopt,Activity,CoreValue])],
  providers: [AboutSoptService, ActivityService, CoreValueService],
  controllers: [AboutSoptController, ActivityController, CoreValueController],
})
export class AboutSoptModule {}