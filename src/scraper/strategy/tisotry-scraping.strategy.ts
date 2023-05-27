import { ScrapingStrategy } from './scrap.strategy';
import { PuppeteerService } from '../puppeteer.service';
import { CreateScraperResponseDto } from '../dto/create-scraper-response.dto';
import { SopticlePlatformEnum } from '../../common/type';

export class TisotryScrapingStrategy extends ScrapingStrategy {
  constructor(protected url: string, puppeteerService: PuppeteerService) {
    super(url, puppeteerService);
  }
  async onLoad(): Promise<CreateScraperResponseDto> {
    return {
      thumbnailUrl: 'zz',
      title: 'zz',
      description: 'ㅋㅋ',
      sopticleUrl: this.url,
      platform: SopticlePlatformEnum.TISTORY,
    };
  }
}
