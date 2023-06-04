import {
  IsString,
  IsUrl,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export function IsValidateSopticlePlatformUrl(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidateSopticlePlatformUrl',
      target: object.constructor,
      async: false,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          if (value.includes('notion.so')) {
            return false;
          }
          return true;
        },
      },
    });
  };
}

export class ScrapSopticleDto {
  @ApiProperty({
    type: String,
    required: true,
    description: '솝티클 주소 입니다. Notion 플랫폼을 제외하고 가능합니다.',
  })
  @IsUrl()
  @IsString()
  @IsValidateSopticlePlatformUrl({
    message: 'Notion 플랫폼은 업로드 할 수 없습니다.',
  })
  readonly sopticleUrl: string;
}
