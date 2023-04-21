import { Controller, Get } from '@nestjs/common';
import { FileService } from '../services/file.service';
import { ApiTags } from '@nestjs/swagger';
import { GetPresignedUrlDocs } from '../../../docs/file/file.swagger';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('presigned-url')
  @GetPresignedUrlDocs()
  getPresignedUrl(): Promise<string> {
    return this.fileService.getPresignedUrl();
  }
}
