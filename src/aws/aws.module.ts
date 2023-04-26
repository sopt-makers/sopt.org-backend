import { Module } from '@nestjs/common';
import { StorageService } from './services/storage.service';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '../configs/env.config';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  providers: [
    StorageService,
    {
      provide: S3Client.name,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvConfig>) => {
        return new S3Client({
          region: 'ap-northeast-2',
          credentials: {
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID') ?? '',
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY') ?? '',
          },
        });
      },
    },
  ],
  exports: [StorageService],
})
export class AwsModule {}
