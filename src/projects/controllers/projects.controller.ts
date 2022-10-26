import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetProjectDocs,
  GetProjectsDocs,
} from 'docs/projects/projects.swagger';
import { ProjectType } from 'src/projects/dtos/category';
import { ProjectsListResponseDto } from 'src/projects/dtos/projects-list-response.dto';
import {
  ProjectsResponseDto,
  ServiceType,
} from 'src/projects/dtos/projects-response.dto';

@ApiTags('Project')
@Controller('projects')
export class ProjectsController {
  mockProjectsResponseDto: ProjectsResponseDto = {
    id: 1,
    name: '테스트 프로젝트',
    generation: 30,
    isAvailable: true,
    isFounding: false,
    members: [
      {
        name: '이정연',
        role: 'Project Manager',
        description:
          'API 명세서 작성 및 서버 구축 및 AI 설계 근데 이제 엄청 엄청 긴 세줄을 만들기 위해 추가 설명을 곁들인 ',
      },
      {
        name: '정예린',
        role: 'Project Designer',
        description: 'UXUI 디자인 및 브랜딩 전반을 제작, 그래픽 일러스트 제작',
      },
      {
        name: '정예린',
        role: 'Project Designer',
        description: 'UXUI 디자인 및 브랜딩 전반을 제작, 그래픽 일러스트 제작',
      },
      {
        name: '정예린',
        role: 'Project Designer',
        description: 'UXUI 디자인 및 브랜딩 전반을 제작, 그래픽 일러스트 제작',
      },
    ],
    serviceType: [ServiceType.WEB, ServiceType.APP],
    startAt: new Date(),
    endAt: new Date(),
    summary: '테스트 프로젝트입니다.',
    detail:
      '테스트프로젝트는 영국에서 시작되어 8년이 지나 대한민국으로 들어왔습니다. 이 편지를 본 당신은 행운이 가득하고 모든일이 잘 될겁니다.',
    logoImage:
      'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/logo/1660922410081_AvI196XNRbXdWXpWQKlkg.png',
    link: [{ title: 'github', url: 'https://github.com/TAKE-US/TAKEUS-BACK' }],
    category: { project: ProjectType.APPJAM },
    thumbnailImage: null,
    projectImage: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  @Get('')
  @GetProjectsDocs()
  async getProjects(): Promise<ProjectsListResponseDto> {
    const mockProjectsListResponse: ProjectsListResponseDto = {
      projects: [this.mockProjectsResponseDto, this.mockProjectsResponseDto],
      isEnd: false,
    };
    return mockProjectsListResponse;
  }

  @Get('/:projectId')
  @GetProjectDocs()
  async getProject(): Promise<ProjectsResponseDto> {
    return this.mockProjectsResponseDto;
  }
}
