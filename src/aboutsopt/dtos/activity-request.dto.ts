import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { Category } from '../entities/activity.entity';

export class ActivityRequestDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '기수'
  })
  @IsNumber()
  @Transform(({value})=>parseInt(value), {toClassOnly: true})
  semester: number;

  @ApiProperty({
    type: String,
    enum: Category,
    required: true,
    description: '활동 카테고리 (세미나/솝커톤/앱잼/솝텀/스터디/운팀미팀)'
  })
  category: Category;

  @ApiProperty({
    type: String,
    required: false,
    description:'활동 제목'
  })
  title: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '활동 부제목'
  })
  subtitle: string;

  @ApiProperty({
    type: String,
    required: false,
    description: '활동 이미지'
  })
  image: string;
}