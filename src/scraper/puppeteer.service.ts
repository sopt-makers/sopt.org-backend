import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '../configs/env.config';

@Injectable()
export class PuppeteerService implements OnModuleInit, OnModuleDestroy {
  private browser: puppeteer.Browser;
  private readonly headless: false | 'new';

  constructor(private readonly configService: ConfigService<EnvConfig>) {
    if (this.configService.get('NODE_ENV') === 'local') {
      this.headless = false;
    } else {
      this.headless = 'new';
    }
  }

  async onModuleInit() {
    this.browser = await puppeteer.launch({
      headless: this.headless,
    });
  }

  async onModuleDestroy() {
    await this.browser.close();
  }

  async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: this.headless,
      });
    }
    return this.browser;
  }
}
