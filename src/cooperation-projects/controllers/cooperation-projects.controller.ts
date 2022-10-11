import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCooperationProjectsDocs } from 'docs/cooperation-projects/cooperation-projects.swagger';
import { CooperationProjectsResponseDto } from 'src/cooperation-projects/dtos/cooperation-projects-response.dto';

@ApiTags('CooperationProject')
@Controller('cooperation-projects')
export class CooperationProjectsController {
  @Get()
  @GetCooperationProjectsDocs()
  async getCooperationProjects(): Promise<
    Array<CooperationProjectsResponseDto>
  > {
    const mockCooperationProject: CooperationProjectsResponseDto = {
      id: 11,
      year: 2022,
      title: 'KB D.N.A 프로젝트',
      content: `KB금융그룹과 SOPT, 디지털 전문가가 협업하여 KB 디지털 프로젝트의 개선과제를 발굴하고, 이를 해결하기 위한 구체적인 아이디어를 도출해 프로토타입을 제작하는 프로젝트`,
      subContent: '2018년부터 총 5회 진행',
      posterImage:
        'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/partners/poster/1661005789051_chHEt5ezSXlTRKfHmRnRv.png',
    };
    return [mockCooperationProject];
  }
}
