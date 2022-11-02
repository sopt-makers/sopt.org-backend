import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPartnersDocs } from 'docs/partners/partners.swagger';
import { PartnersResponseDto } from 'src/partners/dtos/partners-response.dto';
import { Partner } from 'src/partners/entities/partners.entity';
import { PartnersService } from 'src/partners/services/partners.service';

function getPartnersResponseDto(partners: Partner[]): PartnersResponseDto[] {
  return partners.map((partner: Partner) => {
    return {
      id: partner.id,
      name: partner.name,
      image: partner.image,
    };
  });
}

@Controller('partners')
@ApiTags('Partner')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}
  @Get('')
  @GetPartnersDocs()
  async getPartners(): Promise<Array<PartnersResponseDto>> {
    const partners = await this.partnersService.findAll();
    return getPartnersResponseDto(partners);
  }
}
