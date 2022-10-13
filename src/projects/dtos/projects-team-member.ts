import { ApiProperty } from '@nestjs/swagger';

export class ProjectsTeamMember {
  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트 팀원 이름',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트 팀원의 역할',
  })
  role: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '프로젝트 팀원의 역할 상세설명',
  })
  roleDetail: string;
}
