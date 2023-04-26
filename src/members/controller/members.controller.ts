import { MembersService } from './../service/members.service';
import {
  Body,
    Controller,
    Get,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}


}
  