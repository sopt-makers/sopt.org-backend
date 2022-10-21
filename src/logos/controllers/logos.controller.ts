import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetLogosDocs } from 'docs/logos/logos.swagger';
import { LogosResponseDto } from 'src/logos/dtos/logos-response.dto';
import { Logo } from 'src/logos/entities/logos.entity';
import { LogosService } from 'src/logos/services/logos.service';

function getLogosResponseDto(logos: Logo[]): LogosResponseDto[] {
  return logos.map((logo: Logo) => {
    return {
      id: logo.id,
      image: logo.image ? logo.image : '',
    };
  });
}

@ApiTags('Logos')
@Controller('logos')
export class LogosController {
  constructor(private readonly logosService: LogosService) {}

  @Get('')
  @GetLogosDocs()
  async getLogos(): Promise<LogosResponseDto[]> {
    const logos = await this.logosService.findAll();
    return getLogosResponseDto(logos);
  }
}
