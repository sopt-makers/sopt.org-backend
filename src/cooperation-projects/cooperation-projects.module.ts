import { Module } from '@nestjs/common';
import { CooperationProjectsController } from './controllers/cooperation-projects.controller';

@Module({
  controllers: [CooperationProjectsController],
})
export class CooperationProjectsModule {}
