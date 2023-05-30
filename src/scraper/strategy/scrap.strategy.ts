import { PuppeteerService } from '../puppeteer.service';
import { CreateScraperResponseDto } from '../dto/create-scraper-response.dto';

export abstract class ScrapingStrategy {
  protected constructor(
    protected url: string,
    protected puppeteerService: PuppeteerService,
  ) {}

  abstract onLoad(): Promise<CreateScraperResponseDto>;
}
