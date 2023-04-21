import { Controller, Get } from '@nestjs/common';
import { FileService } from '../services/file.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('presigned-url')
  getPresignedUrl(): Promise<string> {
    return this.fileService.getPresignedUrl();
  }
}
