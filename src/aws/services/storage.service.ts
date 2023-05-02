import { Inject, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { EnvConfig } from '../../configs/env.config';
import { FileType } from '../../file/controllers/file.controller';

@Injectable()
export class StorageService {
  private readonly DEFAULT_PATH = 'admin/origin/';
  constructor(
    @Inject(S3Client.name) private readonly s3Client: S3Client,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async getPresingedUrl(type: FileType): Promise<string> {
    return getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        Bucket: this.configService.get('BUCKET_NAME'),
        Key: this.generateKey(type),
        ContentType: 'image/jpeg, image/png, image/jpg',
      }),
      { expiresIn: 60 },
    );
  }

  private generateKey(type: FileType): string {
    return (
      this.DEFAULT_PATH + dayjs().format('YYYYMMDD') + '-' + uuid() + '.' + type
    );
  }
}
