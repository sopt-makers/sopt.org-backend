import { ApiProperty } from '@nestjs/swagger';

export class VisitorCountUpResponseDto {
  @ApiProperty({
    description: '성공 여부',
    nullable: false,
    example: 'Success',
  })
  Status: string;
}

export class GetTodayVisitorResponseDto {
  @ApiProperty({
    description: '오늘 하루 방문자 수',
    nullable: false,
    example: '2024',
  })
  Count: number;
}
