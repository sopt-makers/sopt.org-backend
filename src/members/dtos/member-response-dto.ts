import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class MemberResponseDto{
    @ApiProperty({
      description: 'PK',
      required: true,
    })
    id: number;

    @ApiProperty({
      description: '이름',
      required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
      description: '프로필 사진',
      required: false,
    })
    @IsString()
    profileImage: string;

    @ApiProperty({
      description: '소개',
      required: false,
    })
    @IsString()
    introduction: string;

    @ApiProperty({
      description: '파트',
      required: true,
    })
    @IsString()
    part: string;

    @ApiProperty({
      description: '기수',
      required: true,
    })
    @IsNumber()
    generation: number;
  }