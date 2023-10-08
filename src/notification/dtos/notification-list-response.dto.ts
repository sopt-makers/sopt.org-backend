import { ApiProperty } from '@nestjs/swagger';

export class GetNotificationListResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: '기수',
    example: 34,
  })
  readonly generation: number;

  @ApiProperty({
    type: [String],
    required: true,
    description: '모집알림 신청한 이메일 리스트',
    example: ['example@naver.com', 'example2@naver.com', 'example3@naver.com'],
  })
  readonly emailList: Array<string>;
}
