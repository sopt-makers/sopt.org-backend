import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import * as _ from 'lodash';

import { CreateScraperResponseDto } from './dto/create-scraper-response.dto';
import { ScrapSopticleDto } from '../sopticle/dtos/scrap-sopticle.dto';

@Injectable()
export class ScraperService {
  constructor(private readonly httpService: HttpService) {}

  async scrap({
    sopticleUrl,
  }: ScrapSopticleDto): Promise<CreateScraperResponseDto> {
    if (this.checkNaverBlog(sopticleUrl)) {
      console.log('Naver Blog Scrape Init');
      return this.scrapeNaverBlog(sopticleUrl);
    }

    const html = await this.getHtmlData(sopticleUrl);

    const $ = cheerio.load(html);
    const title = this.getTitle($, sopticleUrl);

    const thumbnailUrl = this.getImage($, sopticleUrl);

    const description = this.getDescription($, sopticleUrl);
    return {
      thumbnailUrl,
      title,
      description,
      sopticleUrl,
    };
  }

  private getTitle($: cheerio.CheerioAPI, url: string): string {
    const title = $('meta[property="og:title"]').attr('content');

    if (_.isNil(title)) {
      console.error('Scraper get Title Null, url: ', url);
      throw new InternalServerErrorException(
        '페이지 정책에 의해 제목을 가져올 수 없습니다.',
      );
    }

    return title;
  }

  private getDescription($: cheerio.CheerioAPI, url: string): string {
    const description = $('meta[property="og:description"]').attr('content');

    if (_.isNil(description)) {
      console.error('Scraper get Description Null, url: ', url);
      throw new InternalServerErrorException(
        '페이지 정책에 의해 Description 을 가져올 수 없습니다.',
      );
    }

    return description;
  }

  private getImage($: cheerio.CheerioAPI, url: string): string {
    const image = $('meta[property="og:image"]').attr('content');

    if (_.isNil(image)) {
      console.error('Scraper get Image Null url:', url);
      throw new InternalServerErrorException(
        '페이지 정책에 의해 썸네일을 가져올 수 없습니다.',
      );
    }

    return image;
  }

  private getHtmlData(url: string): Promise<string> {
    return lastValueFrom(
      this.httpService
        .get(url)
        .pipe(map((response) => response.data))
        .pipe(
          catchError((err) => {
            throw new InternalServerErrorException(
              'Cheerio Service GetHtml Error',
              err.message,
            );
          }),
        ),
    );
  }

  private checkNaverBlog(url: string): boolean {
    return url.includes('blog.naver.com');
  }

  private async scrapeNaverBlog(
    url: string,
  ): Promise<CreateScraperResponseDto> {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url);
    const frame = page.frames().find((frame) => frame.name() === 'mainFrame');

    if (!frame) {
      throw new InternalServerErrorException('Naver Blog Scraping Error Occur');
    }
    const content = await frame.content();
    const $ = cheerio.load(content);

    const title = $('span[class="se-fs- se-ff-"]').text();
    const mainDiv = $('div[class="se-main-container"]');
    const description = mainDiv.find('p').text().slice(0, 300);
    const image = mainDiv.find('img').first().attr('src');
    await browser.close();

    return {
      thumbnailUrl: String(image),
      title,
      description,
      sopticleUrl: url,
    };
  }
}
