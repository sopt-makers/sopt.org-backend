import { Controller, Get } from '@nestjs/common';

@Controller('cooperation-projects')
export class CooperationProjectsController {
  @Get()
  async getCooperationProjects() {
    return 'GET /cooperation-projects';
  }
}
