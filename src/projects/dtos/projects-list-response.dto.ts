import { ApiProperty } from '@nestjs/swagger';
import { ProjectsResponseDto } from 'src/projects/dtos/projects-response.dto';

export class ProjectsListResponseDto {
  @ApiProperty({
    type: [ProjectsResponseDto],
    required: true,
  })
  projects: Array<ProjectsResponseDto>;

  @ApiProperty({
    type: Boolean,
    required: true,
    description:
      '추가 정보 유무. 더 가져올 데이터가 있으면 true, 더 가져올 데이터가 없는 경우 false',
  })
  isEnd: boolean;
}
