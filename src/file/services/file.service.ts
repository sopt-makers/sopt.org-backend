import { Injectable } from '@nestjs/common';

import { StorageService } from '../../aws/services/storage.service';
import { PresignedUrlResponseDto } from '../dto/presigned-url-response.dto';

@Injectable()
export class FileService {
  constructor(private readonly storageService: StorageService) {}

  async getPresignedUrl(): Promise<PresignedUrlResponseDto> {
    return { presignedUrl: await this.storageService.getPresingedUrl() };
  }
}
