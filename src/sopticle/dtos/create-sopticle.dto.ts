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
          return false;
        },
      },
    });
  };
}

export class CreateSopticleDto {
  @ApiProperty({
    type: String,
    required: true,
    description:
      '솝티클 주소 입니다. Velog, Brunch, Tistory  플랫폼만 가능합니다.',
  })
  @IsUrl()
  @IsString()
  @IsValidateSopticlePlatformUrl({ message: 'Invalid url' })
  readonly sopticleUrl: string;
}
