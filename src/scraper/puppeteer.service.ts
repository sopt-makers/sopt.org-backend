import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '../configs/env.config';
import { PuppeteerLaunchOptions } from 'puppeteer';

@Injectable()
export class PuppeteerService implements OnModuleInit, OnModuleDestroy {
  private browser: puppeteer.Browser;
  private readonly options: PuppeteerLaunchOptions;

  constructor(private readonly configService: ConfigService<EnvConfig>) {
    if (this.configService.get('LOCAL')) {
      this.options = {
        headless: false,
      };
    } else {
      this.options = {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/usr/bin/chromium-browser', // docker 환경에서는 chromium path를 직접 지정
      };
    }
  }

  async onModuleInit() {
    this.browser = await puppeteer.launch(this.options);
  }

  async onModuleDestroy() {
    await this.browser.close();
  }

  async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch(this.options);
    }
    return this.browser;
  }
}
