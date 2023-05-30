import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlaygroundService } from './playground.service';
import { PlaygroundRepository } from './playground.repository';

@Module({
  imports: [HttpModule],
  providers: [PlaygroundService, PlaygroundRepository],
  exports: [PlaygroundService],
})
export class PlaygroudModule {}
