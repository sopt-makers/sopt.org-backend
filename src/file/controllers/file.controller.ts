import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FileService } from '../services/file.service';
import { GetPresignedUrlDocs } from '../../../docs/file/file.swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { PresignedUrlDto } from '../dto/presigned-url.dto';

@ApiTags('Admin-file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('presigned-url')
  @GetPresignedUrlDocs()
  @UseGuards(AuthGuard)
  getPresignedUrl(): Promise<PresignedUrlDto> {
    return this.fileService.getPresignedUrl();
  }
}
