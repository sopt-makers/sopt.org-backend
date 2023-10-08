import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { NotificationService } from '../services/notification.service';
import { GetNotificationListResponseDto } from '../dtos/notification-list-response.dto';
import { RegisterNotificationDto } from '../dtos/register-notification.dto';
import {
  GetNotificationEmailListDocs,
  RegisterNotificationDocs,
} from '../../../docs/notification/notification.swagger';
import { RegisterNotificationResponseDto } from '../dtos/register-notification-response.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('register')
  @RegisterNotificationDocs()
  async registerNotification(
    @Body() dto: RegisterNotificationDto,
  ): Promise<RegisterNotificationResponseDto | null> {
    return null;
  }

  @Get('list')
  @GetNotificationEmailListDocs()
  async getNotificationEmailList(
    @Query('generation') id: number,
  ): Promise<GetNotificationListResponseDto> {
    return new GetNotificationListResponseDto();
    // return this.aboutSoptService.getAboutSopt(id);
  }
}
