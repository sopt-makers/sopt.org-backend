import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import {
  GetTodayVisitorResponseDto,
  VisitorCountUpResponseDto,
} from '../dtos/visitor-response.dto';
import { Request } from 'express';
import { Cache } from 'cache-manager';
import { Cron, CronExpression } from '@nestjs/schedule';

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
      const realIp = req.headers['x-real-ip'] as string;
      const forwardedFor = req.headers['x-forwarded-for'] as string;

      const clientIp = realIp || forwardedFor || ip;
      const userAgent = req.get('user-agent');
      const uniqueUserInfo = `visitor-${userAgent}${clientIp}`;

      await this.cacheManager.set(uniqueUserInfo, 'visited', 24 * 60 * 60);

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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'visitor-reset',
    timeZone: 'Asia/Seoul',
  })
  async visitorReset() {
    try {
      const allKeys = await ((await this.cacheManager.store) as any).keys();
      const allVisitors = allKeys.filter((key: string) =>
        key.includes('visitor-'),
      );

      const promiseList: any[] = [];
      for (const key of allVisitors) {
        promiseList.push(async () => {
          await this.cacheManager.del(key);
        });
      }
      await Promise.all(
        promiseList.map((promise) => {
          return promise();
        }),
      );

      console.log('Visitor Reset CronJob Complete');
    } catch (err) {
      console.log(err);
    }
  }
}
