import { Inject, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { EnvConfig } from '../../configs/env.config';

@Injectable()
export class StorageService {
  private readonly DEFAULT_PATH = 'admin/origin/';
  constructor(
    @Inject(S3Client.name) private readonly s3Client: S3Client,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async getPresingedUrl(): Promise<string> {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 1);
    return getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        Bucket: this.configService.get('BUCKET_NAME'),
        Key: this.DEFAULT_PATH + uuid(),
        ContentType: 'image/jpeg, image/png, image/jpg',
      }),
      { expiresIn: 60 },
    );
  }
}
