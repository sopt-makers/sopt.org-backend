import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScrapingStrategyFactoryService } from './scraping-strategy-factory.service';
import { PuppeteerService } from './puppeteer.service';

@Module({
  providers: [ScraperService, ScrapingStrategyFactoryService, PuppeteerService],
  exports: [ScraperService],
})
export class ScraperModule {}
