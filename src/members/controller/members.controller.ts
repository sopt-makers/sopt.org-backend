import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { GetMembersDocs } from 'docs/members/member.swagger';
import { MemberListResponseDto } from '../dtos/member-response.dto';
import { MemberService } from '../service/member.service';
import { MemberRequestDto } from '../dtos/member-request.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('member')
export class MembersController {
  constructor(private readonly membersService: MemberService) {}

  @Get('')
  @GetMembersDocs()
  async getMembers(
    @Query() memberDto: MemberRequestDto,
  ): Promise<MemberListResponseDto> {
    return this.membersService.findAll(memberDto);
  }
}
