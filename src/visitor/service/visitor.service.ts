import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import {
  GetTodayVisitorResponseDto,
  VisitorCountUpResponseDto,
} from '../dtos/visitor-response.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class VisitorService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  /**
   * 방문자가 늘어날 때, Cache 에 User Agent 정보를 기반으로 저장합니다.
   */
  async visitorCountUp(): Promise<VisitorCountUpResponseDto> {
    const result: VisitorCountUpResponseDto = { Status: 'fail' };
    try {
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
    } catch (err) {
      console.log(err);
    }

    return result;
  }
}
