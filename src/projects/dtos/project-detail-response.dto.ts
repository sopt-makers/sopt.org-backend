import { ApiProperty } from '@nestjs/swagger';
import { Member } from 'src/internal/playground/dto/member';
import { ProjectsResponseDto } from './projects-response.dto';

export class ProjectDetailResponseDto extends ProjectsResponseDto {
  @ApiProperty({
    type: Date,
    required: true,
    description: '프로젝트 시작 날짜',
  })
  startAt: Date;

  @ApiProperty({
    type: Date,
    required: false,
    nullable: true,
    description: '프로젝트 종료 날짜. 프로젝트가 진행중 일 경우 값 없음',
  })
  endAt?: Date;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '프로젝트의 서비스 진행 여부',
  })
  isAvailable: boolean;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '프로젝트의 창업 여부',
  })
  isFounding: boolean;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    description: '프로젝트 이미지 URL',
  })
  projectImage: string | null;

  @ApiProperty({
    type: Date,
    required: true,
    description: '프로젝트를 등록한 시간',
  })
  uploadedAt: Date;

  @ApiProperty({
    type: Date,
    required: true,
    description: '프로젝트를 수정한 시간',
  })
  updatedAt: Date;

  @ApiProperty({
    type: [Member],
    required: true,
    description: '프로젝트 팀원',
  })
  members: Array<Member>;
}
