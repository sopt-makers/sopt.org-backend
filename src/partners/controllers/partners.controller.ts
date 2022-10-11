import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPartnersDocs } from 'docs/partners/partners.swagger';
import { PartnersResponseDto } from 'src/partners/dtos/partners-response.dto';

@Controller('partners')
@ApiTags('Partner')
export class PartnersController {
  @Get('')
  @GetPartnersDocs()
  async getPartners(): Promise<Array<PartnersResponseDto>> {
    const mockPartner: PartnersResponseDto = {
      id: 1,
      name: 'Naver D2',
      image:
        'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/partners/logo/1660976077325_3EGL__X9xnpjgH3i49kKF.png',
    };
    return [mockPartner];
  }
}
