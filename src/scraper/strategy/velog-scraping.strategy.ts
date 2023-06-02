import { ScrapingStrategy } from './scrap.strategy';
import { PuppeteerService } from '../puppeteer.service';
import { CreateScraperResponseDto } from '../dto/create-scraper-response.dto';
import { SopticlePlatformEnum } from '../../common/type';
import { Page } from 'puppeteer';
import { InternalServerErrorException } from '@nestjs/common';

export class VelogScrapingStrategy extends ScrapingStrategy {
  constructor(protected url: string, puppeteerService: PuppeteerService) {
    super(url, puppeteerService);
  }

  async onLoad(): Promise<CreateScraperResponseDto> {
    const browser = await this.puppeteerService.getBrowser();
    const page = await browser.newPage();
    await page.goto(this.url);
    const title = await this.getTitle(page);
    const description = await this.getDescription(page);
    const image = await this.getImage(page);
    await page.close();
    return {
      thumbnailUrl: image,
      title,
      description,
      sopticleUrl: this.url,
      platform: SopticlePlatformEnum.VELOG,
    };
  }

  private async getImage(page: Page): Promise<string> {
    const image = await page.$eval('meta[property="og:image"]', (element) =>
      element.getAttribute('content'),
    );

    if (image === null) {
      console.error('Velog get Image Null, url: ', this.url);
      throw new InternalServerErrorException('Velog Image Null');
    }

    return image;
  }

  private async getDescription(page: Page): Promise<string> {
    const description = await page.$eval(
      'meta[property="og:description"]',
      (element) => element.getAttribute('content'),
    );

    if (description === null) {
      console.error('Velog get Description Null, url: ', this.url);
      throw new InternalServerErrorException('Velog Description Null');
    }
    return description;
  }

  private async getTitle(page: Page): Promise<string> {
    const title = await page.$eval('meta[property="og:title"]', (element) =>
      element.getAttribute('content'),
    );

    if (title === null) {
      console.error('Velog get Title Null, url: ', this.url);
      throw new InternalServerErrorException('Velog Title Null');
    }
    return title;
  }
}
