import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MemberResponseDto {
  @ApiProperty({
    description: 'PK',
    nullable: false,
  })
  id: number;

  @ApiProperty({
    description: '이름',
    nullable: false,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '프로필 사진',
    nullable: true,
  })
  @IsString()
  profileImage: string;

  @ApiProperty({
    description: '소개',
    nullable: true,
  })
  @IsString()
  introduction: string;

  @ApiProperty({
    description: '파트',
    nullable: true,
  })
  @IsString()
  part: string;

  @ApiProperty({
    description: '기수',
    nullable: false,
  })
  @IsNumber()
  generation: number;
}

export class MemberListResponseDto {
  @ApiProperty({
    type: [MemberResponseDto],
    nullable: false,
  })
  members: MemberResponseDto[];

  @ApiProperty({
    description: '조회 기수의 총 멤버수',
    nullable: false,
  })
  @IsNumber()
  numberOfMembersAtGeneration: number;
}
