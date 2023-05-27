import { BadRequestException, Injectable } from '@nestjs/common';

import { ScrapingStrategy } from './strategy/scrap.strategy';
import { VelogScrapingStrategy } from './strategy/velog-scraping.strategy';
import { TisotryScrapingStrategy } from './strategy/tisotry-scraping.strategy';
import { PuppeteerService } from './puppeteer.service';

@Injectable()
export class ScrapingStrategyFactoryService {
  constructor(private readonly puppeteerService: PuppeteerService) {}
  newScrapingStrategy(url: string): ScrapingStrategy {
    if (url.includes('tistory')) {
      return new TisotryScrapingStrategy(url, this.puppeteerService);
    }
    if (url.includes('velog.io')) {
      return new VelogScrapingStrategy(url, this.puppeteerService);
    }
    throw new BadRequestException('Not supported platform');
  }
}
