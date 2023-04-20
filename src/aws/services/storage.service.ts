import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class StorageService implements OnModuleInit {
  constructor(@Inject(S3Client.name) private readonly s3Client: S3Client) {}

  async onModuleInit() {
    console.log('AWS Service Init');
  }
}
