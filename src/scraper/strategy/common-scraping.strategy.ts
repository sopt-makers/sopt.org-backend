import { Page } from 'puppeteer';
import { InternalServerErrorException } from '@nestjs/common';

import { ScrapingStrategy } from './scrap.strategy';
import { PuppeteerService } from '../puppeteer.service';
import { CreateScraperResponseDto } from '../dto/create-scraper-response.dto';

export class CommonScrapingStrategy extends ScrapingStrategy {
  constructor(protected url: string, puppeteerService: PuppeteerService) {
    super(url, puppeteerService);
  }
  async onLoad(): Promise<CreateScraperResponseDto> {
    const browser = await this.puppeteerService.getBrowser();
    const page = await browser.newPage();
    await this.goPage(page);
    const title = await this.getTitle(page);
    const description = await this.getDescription(page);
    const image = await this.getImage(page);
    await page.close();

    return {
      title,
      description,
      thumbnailUrl: image,
      sopticleUrl: this.url,
    };
  }

  private async goPage(page: Page) {
    try {
      await page.goto(this.url);
    } catch (e) {
      console.error('Scraper goPage Error, url: ', this.url);
      throw new InternalServerErrorException('잘못된 URL 입니다.');
    }
  }

  private async getImage(page: Page): Promise<string> {
    const image = await page.$eval('meta[property="og:image"]', (element) =>
      element.getAttribute('content'),
    );

    if (image === null) {
      console.error('Scraper get Image Null, url: ', this.url);
      throw new InternalServerErrorException(
        '페이지 정책에 의해 썸네일을 가져올 수 없습니다.',
      );
    }

    return image;
  }

  private async getDescription(page: Page): Promise<string> {
    const description = await page.$eval(
      'meta[property="og:description"]',
      (element) => element.getAttribute('content'),
    );

    if (description === null) {
      console.error('Scraper get Description Null, url: ', this.url);
      throw new InternalServerErrorException(
        '페이지 정책에 의해 Description 을 가져올 수 없습니다.',
      );
    }
    return description;
  }

  private async getTitle(page: Page): Promise<string> {
    const title = await page.$eval('meta[property="og:title"]', (element) =>
      element.getAttribute('content'),
    );

    if (title === null) {
      console.error('Scraper get Title Null, url: ', this.url);
      throw new InternalServerErrorException(
        '페이지 정책에 의해 Title 을 가져올 수 없습니다.',
      );
    }
    return title;
  }
}
