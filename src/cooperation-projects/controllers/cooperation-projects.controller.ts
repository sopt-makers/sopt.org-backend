import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCooperationProjectsDocs } from 'docs/cooperation-projects/cooperation-projects.swagger';

@ApiTags('CooperationProject')
@Controller('cooperation-projects')
export class CooperationProjectsController {
  @Get()
  @GetCooperationProjectsDocs()
  async getCooperationProjects() {
    return 'GET /cooperation-projects';
  }
}
