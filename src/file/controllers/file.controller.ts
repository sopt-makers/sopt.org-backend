import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FileService } from '../services/file.service';
import { GetPresignedUrlDocs } from '../../../docs/file/file.swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { PresignedUrlResponseDto } from '../dto/presigned-url-response.dto';
import { FileTypeValidationPipe } from '../pipes/filet-type-validation.pipe';

export enum FileType {
  jpg = 'jpg',
  jpeg = 'jpeg',
  png = 'png',
}

@ApiTags('Admin-file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('presigned-url')
  @GetPresignedUrlDocs()
  @UseGuards(AuthGuard)
  getPresignedUrl(
    @Query('fileType', FileTypeValidationPipe) type: FileType,
  ): Promise<PresignedUrlResponseDto> {
    return this.fileService.getPresignedUrl(type);
  }
}
