import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MembersController } from './controller/members.controller';
import { MemberService } from './service/member.service';

@Module({
  imports: [HttpModule],
  providers: [MemberService],
  controllers: [MembersController],
  exports: [MemberService],
})
export class MemberModule {}
