import { ApiProperty } from '@nestjs/swagger';

export class ClearCacheResponseDto {
  @ApiProperty({
    description: '성공 여부',
    nullable: false,
    example: 'Success',
  })
  Status: string;
}
