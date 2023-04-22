import {
    Controller,
    Get,
    Query,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
import { ActivityService } from '../services/activity.service';
  
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

}
  