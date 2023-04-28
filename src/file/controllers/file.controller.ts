import { Controller, Get, UseGuards } from '@nestjs/common';
import { FileService } from '../services/file.service';
import { ApiTags } from '@nestjs/swagger';
import { GetPresignedUrlDocs } from '../../../docs/file/file.swagger';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('Admin-file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('presigned-url')
  @GetPresignedUrlDocs()
  @UseGuards(AuthGuard)
  getPresignedUrl(): Promise<string> {
    return this.fileService.getPresignedUrl();
  }
}
