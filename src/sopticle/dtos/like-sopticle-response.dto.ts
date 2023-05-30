import { ApiProperty } from '@nestjs/swagger';

export class LikeSopticleResponseDto {
  @ApiProperty({
    type: String,
    nullable: false,
    description: 'like Id',
  })
  readonly id: number;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'sopticle Id',
  })
  readonly sopticleId: number;

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'session Id',
  })
  readonly sessionId: string;

  @ApiProperty({
    type: String,
    nullable: false,
    description: '생성일자',
  })
  readonly createdAt: Date;
}
