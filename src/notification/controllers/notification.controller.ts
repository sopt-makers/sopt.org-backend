import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { NotificationService } from '../services/notification.service';
import { AboutSoptResponseDto } from '../dtos/aboutsopt-response.dto';
import { AboutSoptUpdateDto } from '../dtos/aboutsopt-update.dto';
import {
  GetAboutSoptDocs,
  GetAdminAboutSoptDocs,
  UpdateAboutSoptDocs,
  PublishAboutSoptDocs,
  GetPublishedAboutSoptIdsDocs,
} from '../../../docs/aboutsopt/aboutSopt.swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { GetAboutSoptResponseDto } from '../dtos/get-about-sopt-response.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('register')
  @UseGuards(AuthGuard)
  @PublishAboutSoptDocs()
  async publishAboutSopt(
    @Param('id') id: number,
  ): Promise<AboutSoptResponseDto | null> {
    return null;
  }

  @Get('')
  @GetAboutSoptDocs()
  async getAboutSopt(
    @Query('generation') id?: number,
  ): Promise<GetAboutSoptResponseDto> {
    return new GetAboutSoptResponseDto();
    // return this.aboutSoptService.getAboutSopt(id);
  }
}
