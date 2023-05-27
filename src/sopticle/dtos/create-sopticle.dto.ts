import {
  IsString,
  IsUrl,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const validateVelogURL = (url: string): boolean => {
  const velogRegexp = /^https:\/\/velog\.io\/@[^/]+(\/[^/]+)?\/?$/;
  return velogRegexp.test(url);
};

export const validateTistoryURL = (url: string): boolean => {
  const tistoryRegexp = /^https:\/\/(?:\w+(?:-)?)+\.tistory\.com\/[^/]+\/?$/;
  return tistoryRegexp.test(url);
};

export const validateBrunchURL = (url: string): boolean => {
  const brunchRegexp = /^https:\/\/brunch\.co\.kr\/[^/]+\/[^/]+\/?$/;
  return brunchRegexp.test(url);
};

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
          if (value.includes('velog.io')) {
            return validateVelogURL(value);
          }
          if (value.includes('tistory.com')) {
            return validateTistoryURL(value);
          }
          if (value.includes('brunch.co.kr')) {
            return validateBrunchURL(value);
          }
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
