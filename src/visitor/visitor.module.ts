import { Module, CacheModule as NestCacheModule } from '@nestjs/common';
import { VisitorController } from './controller/visitor.controller';
import { VisitorService } from './service/visitor.service';

@Module({
  imports: [NestCacheModule.register()],
  providers: [VisitorService],
  controllers: [VisitorController],
  exports: [VisitorService],
})
export class VisitorModule {}
