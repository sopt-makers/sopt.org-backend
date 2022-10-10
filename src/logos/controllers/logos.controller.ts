import { Controller, Get } from '@nestjs/common';

@Controller('logos')
export class LogosController {
  @Get('')
  async getLogos() {
    return 'GET /logos';
  }
}
