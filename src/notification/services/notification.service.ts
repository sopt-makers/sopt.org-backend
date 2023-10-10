import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Notification } from '../entities/notification.entity';
import { RegisterNotificationDto } from '../dtos/register-notification.dto';
import { RegisterNotificationResponseDto } from '../dtos/register-notification-response.dto';
import { GetNotificationListResponseDto } from '../dtos/notification-list-response.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async registerNotification(
    registerNotificationDto: RegisterNotificationDto,
  ): Promise<RegisterNotificationResponseDto> {
    // 특정기수에 이미 알림을 신청한 이메일 체크
    const checkRegistered = await this.notificationRepository.findOne({
      where: {
        generation: registerNotificationDto.generation,
        email: registerNotificationDto.email,
      },
    });

    if (checkRegistered) {
      throw new BadRequestException(
        'Already Registered Email: ' + registerNotificationDto.email,
      );
    }

    // 알림 신청 이메일 목록 추가
    return this.notificationRepository.save(
      Notification.from({ ...registerNotificationDto }),
    );
  }

  async getNotificationEmailList(
    generation: number,
  ): Promise<GetNotificationListResponseDto> {
    const emailList = (
      await this.notificationRepository.find({
        where: { generation },
      })
    ).map((notiRecord) => notiRecord.email);

    return {
      generation,
      emailList,
    };
  }
}
