import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PresignedUrlResponseDto {
  @ApiProperty({
    type: String,
    nullable: false,
    description: 'presigned url',
  })
  @IsString()
  readonly presignedUrl: string;
}
