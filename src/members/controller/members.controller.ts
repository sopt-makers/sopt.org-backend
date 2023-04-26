
import {
    Controller,
    Get,
    Query,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
import { MemberResponseDto } from '../dtos/member-response-dto';
import { MembersService } from '../service/members.service';
  

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('member')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
  @Get('')
  async getAllStudy(
    @Query('filter') filter:number,
    @Query('generation') generation:number,
  ): Promise<MemberResponseDto[]> {
    const projects = await this.membersService.findAll(filter, generation);

    return projects;
  }

}