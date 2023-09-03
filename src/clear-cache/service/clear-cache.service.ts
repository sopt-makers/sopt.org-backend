import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ClearCacheResponseDto } from '../dtos/clear-cache.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class ClearCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  /**
   * 외부서비스로 부터 캐싱으로 저장되는 데이터를 업데이트하기 위해 저장된 캐시를 삭제합니다.
   */
  async clearCache(): Promise<ClearCacheResponseDto> {
    const result: ClearCacheResponseDto = { Status: 'fail' };
    try {
      await this.cacheManager.reset();
      result.Status = 'Success';
      console.log('Cache Cleared');
    } catch (err) {
      console.log(err);
    }

    return result;
  }
}
