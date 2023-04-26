import { Module } from '@nestjs/common';

import { AwsModule } from '../aws/aws.module';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';

@Module({
  imports: [AwsModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
