import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterNotificationDto {
  @ApiProperty({
    type: Number,
    description: '활동 기수',
    required: true,
    example: 34,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly generation: number;

  @ApiProperty({
    type: String,
    required: true,
    description: '이메일',
    example: 'example@naver.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
