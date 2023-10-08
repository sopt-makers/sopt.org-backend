import {
  Body,
  Controller,
  Get,
  Post,
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
    return await this.notificationService.registerNotification(dto);
  }

  @Get('list')
  @GetNotificationEmailListDocs()
  async getNotificationEmailList(
    @Query('generation') generation: number,
  ): Promise<GetNotificationListResponseDto> {
    return await this.notificationService.getNotificationEmailList(generation);
  }
}
