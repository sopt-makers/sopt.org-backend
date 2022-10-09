import { Controller, Get } from '@nestjs/common';

@Controller('partners')
export class PartnersController {
  @Get()
  async getPartners() {
    return 'GET /partners';
  }
}
