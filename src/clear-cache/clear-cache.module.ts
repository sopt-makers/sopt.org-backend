import { Module, CacheModule as NestCacheModule } from '@nestjs/common';
import { ClearCacheController } from './controller/clear-cache.controller';
import { ClearCacheService } from './service/clear-cache.service';

@Module({
  imports: [NestCacheModule.register()],
  providers: [ClearCacheService],
  controllers: [ClearCacheController],
  exports: [ClearCacheService],
})
export class ClearCacheModule {}
