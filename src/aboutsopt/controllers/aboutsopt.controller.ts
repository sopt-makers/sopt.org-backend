import {
    Controller,
    Get,
    Query,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  
import { AboutSoptService } from '../services/aboutsopt.service';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('aboutsopt')
export class AboutSoptController {
  constructor(
    private readonly aboutsoptService: AboutSoptService) {}

}
  