import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetLogosDocs } from 'docs/logos/logos.swagger';
@ApiTags('Logos')
@Controller('logos')
export class LogosController {
  @Get('')
  @GetLogosDocs()
  async getLogos() {
    return 'GET /logos';
  }
}
