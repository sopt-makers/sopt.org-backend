import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import * as _ from 'lodash';

import { CreateScraperResponseDto } from './dto/create-scraper-response.dto';
import { PuppeteerLaunchOptions } from 'puppeteer';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '../configs/env.config';
import { ScrapArticleDto } from './dto/scrap-article.dto';

@Injectable()
export class ScraperService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async scrap({
    articleUrl,
  }: ScrapArticleDto): Promise<CreateScraperResponseDto> {
    if (this.checkNaverBlog(articleUrl)) {
      return this.scrapeNaverBlog(articleUrl);
    }

    const html = await this.getHtmlData(articleUrl);

    const $ = cheerio.load(html);
    const title = this.getTitle($, articleUrl);

    const thumbnailUrl = this.getImage($, articleUrl);

    const description = this.getDescription($, articleUrl);
    return {
      thumbnailUrl,
      title,
      description,
      articleUrl,
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
              err.message + ' URL: ' + url,
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
    const puppeteerOption: PuppeteerLaunchOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
      timeout: 0,
    };

    if (!this.configService.get('LOCAL')) {
      puppeteerOption.executablePath = '/usr/bin/chromium-browser';
    }

    const browser = await puppeteer.launch(puppeteerOption);
    const page = await browser.newPage();

    await page.goto(url);
    const frame = page.frames().find((frame) => frame.name() === 'mainFrame');

    if (!frame) {
      throw new InternalServerErrorException(
        'Naver Blog Scraping Error With URL: ' + url,
      );
    }
    const content = await frame.content();
    const $ = cheerio.load(content);

    const originTitle = $('span[class="se-fs- se-ff-"]').text();
    const mainDiv = $('div[class="se-main-container"]');
    const description = mainDiv.find('p').text().slice(0, 300);
    const imageLinkList: string[] = [];
    mainDiv.find('img').each((_, element) => {
      const imgSrc = $(element).attr('src');
      imageLinkList.push(String(imgSrc));
    });
    const uploadedImage = imageLinkList.find(
      (image) => image.includes('postfiles.pstatic.net'), // 해당 이미지 링크의 경우, 문제가 발생하지 않음
    );
    const image = uploadedImage
      ? this.naverBlogImageClarification(uploadedImage)
      : imageLinkList[0];

    await browser.close();

    if (!description) {
      throw new InternalServerErrorException(
        '페이지 정책에 의해 설명을 가져올 수 없습니다.',
      );
    }
    const title = !originTitle ? this.generateTitle(description) : originTitle;

    if (!title) {
      throw new InternalServerErrorException(
        '페이지 정책에 의해 제목을 가져올 수 없습니다.',
      );
    }

    return {
      thumbnailUrl: String(image),
      title,
      description,
      articleUrl: url,
    };
  }

  private generateTitle(description: string): string {
    if (description.length >= 150) {
      return description.slice(0, 30);
    }
    return description;
  }

  /*
  네이버 블로그 이미지를 스크래핑 할 때 매우 저화질로 가져오는 경우가 있어,
  수작업으로 고화질 이미지로 변경해주는 작업
   */
  private naverBlogImageClarification(link: string): string {
    const lowPixelType = 'w80_blur';
    const highPixelType = 'w966';
    if (link.includes('w80_blur')) {
      return link.replace(lowPixelType, highPixelType);
    } else {
      return link;
    }
  }
}
