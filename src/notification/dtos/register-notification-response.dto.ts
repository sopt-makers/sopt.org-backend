import { ApiProperty } from '@nestjs/swagger';

export class RegisterNotificationResponseDto {
  @ApiProperty({
    type: String,
    nullable: false,
    description: 'notification Id',
  })
  readonly id: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    description: '기수',
  })
  readonly generation: number;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '이메일',
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '생성일자',
  })
  readonly createdAt: Date;
}
