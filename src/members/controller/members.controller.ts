import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { GetMembersDocs } from 'docs/members/member.swagger';
import { MemberResponseDto } from '../dtos/member-response.dto';
import { MembersService } from '../service/members.service';
import { MemberRequestDto } from '../dtos/member-request.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('member')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('')
  @GetMembersDocs()
  async getMembers(
    @Query() memberDto: MemberRequestDto,
  ): Promise<MemberResponseDto[]> {
    return this.membersService.findAll(memberDto);
  }
}
