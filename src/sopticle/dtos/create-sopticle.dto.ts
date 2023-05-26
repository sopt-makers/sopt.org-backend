import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSopticleDto {
  @ApiProperty({
    type: String,
    required: true,
    description: '솝티클 주소, Velog, Brunch, Tistory 등',
  })
  @IsUrl()
  @IsString()
  readonly sopticleUrl: string;
}
