import { Inject, Injectable } from '@nestjs/common';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { EnvConfig } from '../../configs/env.config';

@Injectable()
export class StorageService {
  constructor(
    @Inject(S3Client.name) private readonly s3Client: S3Client,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async getPresingedUrl(): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('BUCKET_NAME'),
      Key: uuid(),
    });
    return getSignedUrl(this.s3Client, command, { expiresIn: 60 * 30 });
  }
}
