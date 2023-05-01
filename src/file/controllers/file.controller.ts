import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FileService } from '../services/file.service';
import { GetPresignedUrlDocs } from '../../../docs/file/file.swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { PresignedUrlResponseDto } from '../dto/presigned-url-response.dto';

@ApiTags('Admin-file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('presigned-url')
  @GetPresignedUrlDocs()
  @UseGuards(AuthGuard)
  getPresignedUrl(): Promise<PresignedUrlResponseDto> {
    return this.fileService.getPresignedUrl();
  }
}
