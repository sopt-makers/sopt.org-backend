import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CrewRepository } from './crew.repository';
import { CrewService } from './crew.service';

@Module({
  imports: [HttpModule],
  providers: [CrewService, CrewRepository],
  exports: [CrewService],
})
export class CrewModule {}
