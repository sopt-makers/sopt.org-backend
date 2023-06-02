import { Injectable } from '@nestjs/common';

import { ScrapingStrategy } from './strategy/scrap.strategy';
import { PuppeteerService } from './puppeteer.service';
import { CommonScrapingStrategy } from './strategy/common-scraping.strategy';

@Injectable()
export class ScrapingStrategyFactoryService {
  constructor(private readonly puppeteerService: PuppeteerService) {}
  newScrapingStrategy(url: string): ScrapingStrategy {
    return new CommonScrapingStrategy(url, this.puppeteerService);
  }
}
