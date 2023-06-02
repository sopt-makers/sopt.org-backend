import { BadRequestException, Injectable } from '@nestjs/common';

import { ScrapingStrategy } from './strategy/scrap.strategy';
import { PuppeteerService } from './puppeteer.service';

@Injectable()
export class ScrapingStrategyFactoryService {
  constructor(private readonly puppeteerService: PuppeteerService) {}
  newScrapingStrategy(url: string): ScrapingStrategy {
    throw new BadRequestException('Not supported platform');
  }
}
