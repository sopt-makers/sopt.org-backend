import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { FileType } from '../controllers/file.controller';

export class FileTypeValidationPipe extends ValidationPipe {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') {
      return value;
    }
    if (!value || !Object.values(FileType).includes(value)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types are ${Object.values(FileType)}.`,
      );
    }
    return value;
  }
}
