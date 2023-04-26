import { StorageService } from '../../aws/services/storage.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor(private readonly storageService: StorageService) {}

  getPresignedUrl(): Promise<string> {
    return this.storageService.getPresingedUrl();
  }
}
