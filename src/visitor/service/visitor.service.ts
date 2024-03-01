import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import {
  GetTodayVisitorResponseDto,
  VisitorCountUpResponseDto,
} from '../dtos/visitor-response.dto';
import { Request } from 'express';
import { Cache } from 'cache-manager';

@Injectable()
export class VisitorService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  /**
   * 방문자가 늘어날 때, Cache 에 User Agent 정보를 기반으로 저장합니다.
   */
  async visitorCountUp(req: Request): Promise<VisitorCountUpResponseDto> {
    const result: VisitorCountUpResponseDto = { Status: 'fail' };
    try {
      const ip = req.ip;
      const userAgent = req.get('user-agent');
      const uniqueUserInfo = `visitor-${userAgent}${ip}`;

      await this.cacheManager.set(uniqueUserInfo, 'visited');

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
      const allKeys = await ((await this.cacheManager.store) as any).keys();
      const allVisitors = allKeys.filter((key: string) =>
        key.includes('visitor-'),
      );

      result.Count = allVisitors.length;
    } catch (err) {
      console.log(err);
    }

    return result;
  }
}
