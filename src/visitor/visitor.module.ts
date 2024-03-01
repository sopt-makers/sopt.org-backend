import { Module } from '@nestjs/common';
import { VisitorController } from './controller/visitor.controller';
import { VisitorService } from './service/visitor.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [VisitorService],
  controllers: [VisitorController],
  exports: [VisitorService],
})
export class VisitorModule {}
