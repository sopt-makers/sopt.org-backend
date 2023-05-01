import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PresignedUrlDto {
  @ApiProperty({
    type: String,
    nullable: false,
    description: 'presigned url',
  })
  @IsString()
  readonly presignedUrl: string;
}
