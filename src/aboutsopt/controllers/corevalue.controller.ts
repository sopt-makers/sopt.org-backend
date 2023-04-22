import {
    Controller,
    Get,
    Query,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
import { CoreValueService } from '../services/corevalue.service';
  
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('corevalue')
export class CoreValueController {
  constructor(private readonly corevalueService: CoreValueService) {}

}
  