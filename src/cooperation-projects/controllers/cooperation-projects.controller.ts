import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCooperationProjectsDocs } from 'docs/cooperation-projects/cooperation-projects.swagger';
import { CooperationProjectsResponseDto } from 'src/cooperation-projects/dtos/cooperation-projects-response.dto';
import { CooperationProject } from 'src/cooperation-projects/entities/cooperation-projects.entity';
import { CooperationProjectsService } from 'src/cooperation-projects/services/cooperation-projects.service';

function getCooperationProjectsResponseDto(
  cooperationProjects: CooperationProject[],
): CooperationProjectsResponseDto[] {
  return cooperationProjects.map((cooperationProject: CooperationProject) => {
    return {
      id: cooperationProject.id,
      year: cooperationProject.year,
      title: cooperationProject.title,
      content: cooperationProject.content,
      subContent: cooperationProject.subContent,
      posterImage: cooperationProject.posterImage,
    };
  });
}

@ApiTags('CooperationProject')
@Controller('cooperation-projects')
export class CooperationProjectsController {
  constructor(
    private readonly cooperationProjectsService: CooperationProjectsService,
  ) {}
  @Get()
  @GetCooperationProjectsDocs()
  async getCooperationProjects(): Promise<
    Array<CooperationProjectsResponseDto>
  > {
    const cooperationProjects = await this.cooperationProjectsService.findAll();
    console.log(cooperationProjects);
    return getCooperationProjectsResponseDto(cooperationProjects);
  }
}
