import { Injectable } from '@nestjs/common';
import {
  GetTodayVisitorResponseDto,
  VisitorCountUpResponseDto,
} from '../dtos/visitor-response.dto';
import { Request } from 'express';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class VisitorService {
  constructor(private readonly redisService: RedisService) {}

  /**
   * 방문자가 늘어날 때, Cache 에 User Agent 정보를 기반으로 저장합니다.
   */
  async visitorCountUp(req: Request): Promise<VisitorCountUpResponseDto> {
    const result: VisitorCountUpResponseDto = { Status: 'fail' };
    try {
      const ip = req.ip;
      const userAgent = req.get('user-agent');
      const uniqueUserInfo = `visitor-${userAgent}${ip}`;

      await this.redisService.set(uniqueUserInfo, 'visited');

      result.Status = 'Success';
    } catch (err) {
      console.log(err);
    }

    return result;
  }

  /**
   * 하루 방문자 수를 조회합니다.
   */
  async getTodayVisitor(): Promise<GetTodayVisitorResponseDto> {
    const result: GetTodayVisitorResponseDto = { Count: 0 };
    try {
      const allVisitors = await this.redisService.getMultipleKeysPrefix(
        'visitor',
      );

      result.Count = allVisitors.length;
    } catch (err) {
      console.log(err);
    }

    return result;
  }
}
