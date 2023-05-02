import { Injectable } from '@nestjs/common';

import { StorageService } from '../../aws/services/storage.service';
import { PresignedUrlResponseDto } from '../dto/presigned-url-response.dto';
import { FileType } from '../controllers/file.controller';

@Injectable()
export class FileService {
  constructor(private readonly storageService: StorageService) {}

  async getPresignedUrl(type: FileType): Promise<PresignedUrlResponseDto> {
    return { presignedUrl: await this.storageService.getPresingedUrl(type) };
  }
}
