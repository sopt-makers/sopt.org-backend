import { ClearCacheResponseDto } from '../dtos/clear-cache.dto';
import { ClearCacheService } from '../service/clear-cache.service';
import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClearCacheDocs } from '../../../docs/clear-cache/clear-cache.swagger';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('cache')
export class ClearCacheController {
  constructor(private readonly cacheService: ClearCacheService) {}
  @Post('clear')
  @ClearCacheDocs()
  async clearCache(): Promise<ClearCacheResponseDto> {
    return this.cacheService.clearCache();
  }
}
