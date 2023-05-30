import { SopticlePlatformEnum } from '../../common/type';

export class CreateScraperResponseDto {
  readonly thumbnailUrl: string;
  readonly title: string;
  readonly description: string;
  readonly sopticleUrl: string;
  readonly platform: SopticlePlatformEnum;
}
