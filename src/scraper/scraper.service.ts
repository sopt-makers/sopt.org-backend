import { ScrapingStrategyFactoryService } from './scraping-strategy-factory.service';
import { Injectable } from '@nestjs/common';
import { ScrapingStrategy } from './strategy/scrap.strategy';
import { CreateScraperResponseDto } from './dto/create-scraper-response.dto';

@Injectable()
export class ScraperService {
  constructor(
    private readonly scrapingStrategyFactoryService: ScrapingStrategyFactoryService,
  ) {}

  async scrap(strategyUrl: string): Promise<CreateScraperResponseDto> {
    const scraper: ScrapingStrategy =
      this.scrapingStrategyFactoryService.newScrapingStrategy(strategyUrl);
    return await scraper.onLoad();
  }
}
