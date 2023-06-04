import { ScrapingStrategyFactoryService } from './scraping-strategy-factory.service';
import { Injectable } from '@nestjs/common';
import { ScrapingStrategy } from './strategy/scrap.strategy';
import { CreateScraperResponseDto } from './dto/create-scraper-response.dto';
import { ScrapSopticleDto } from '../sopticle/dtos/scrap-sopticle.dto';

@Injectable()
export class ScraperService {
  constructor(
    private readonly scrapingStrategyFactoryService: ScrapingStrategyFactoryService,
  ) {}

  async scrap({
    sopticleUrl,
  }: ScrapSopticleDto): Promise<CreateScraperResponseDto> {
    const scraper: ScrapingStrategy =
      this.scrapingStrategyFactoryService.newScrapingStrategy(sopticleUrl);
    return await scraper.onLoad();
  }
}
