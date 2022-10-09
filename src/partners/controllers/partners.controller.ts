import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPartnersDocs } from 'docs/partners/partners.swagger';

@Controller('partners')
@ApiTags('Partner')
export class PartnersController {
  @Get('')
  @GetPartnersDocs()
  async getPartners() {
    return 'GET /partners';
  }
}
