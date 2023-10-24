import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import { IsValidateSopticlePlatformUrl } from '../../sopticle/dtos/scrap-sopticle.dto';

export class ScrapArticleDto {
  @ApiProperty({
    type: String,
    required: true,
    description: '아티클 주소 입니다. Notion 플랫폼을 제외하고 가능합니다.',
  })
  @IsUrl()
  @IsString()
  @IsValidateSopticlePlatformUrl({
    message: 'Notion 플랫폼은 업로드 할 수 없습니다.',
  })
  readonly articleUrl: string;
}
