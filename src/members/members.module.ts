import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MembersController } from './controller/members.controller';
import { MembersService } from './service/members.service';

@Module({
  imports: [HttpModule],
  providers: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
