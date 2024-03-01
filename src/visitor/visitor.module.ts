import { Module } from '@nestjs/common';
import { VisitorController } from './controller/visitor.controller';
import { VisitorService } from './service/visitor.service';

import { CacheModule as NestCacheModule } from '@nestjs/common/cache/cache.module';

@Module({
  imports: [NestCacheModule.register()],
  providers: [VisitorService],
  controllers: [VisitorController],
  exports: [VisitorService],
})
export class VisitorModule {}
