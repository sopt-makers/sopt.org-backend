import { Injectable } from '@nestjs/common';

import { StorageService } from '../../aws/services/storage.service';
import { PresignedUrlDto } from '../dto/presigned-url.dto';

@Injectable()
export class FileService {
  constructor(private readonly storageService: StorageService) {}

  async getPresignedUrl(): Promise<PresignedUrlDto> {
    return { presignedUrl: await this.storageService.getPresingedUrl() };
  }
}
