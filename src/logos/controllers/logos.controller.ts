import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetLogosDocs } from 'docs/logos/logos.swagger';
import { LogosResponseDto } from 'src/logos/dtos/logos-response.dto';
@ApiTags('Logos')
@Controller('logos')
export class LogosController {
  @Get('')
  @GetLogosDocs()
  async getLogos(): Promise<[LogosResponseDto]> {
    const mockLogo: LogosResponseDto = {
      id: 1,
      image:
        'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/logo/1660922410081_AvI196XNRbXdWXpWQKlkg.png',
    };
    return [mockLogo];
  }
}
