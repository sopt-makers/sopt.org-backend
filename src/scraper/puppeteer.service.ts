import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '../configs/env.config';

@Injectable()
export class PuppeteerService implements OnModuleInit, OnModuleDestroy {
  private browser: puppeteer.Browser;

  constructor(private readonly configService: ConfigService<EnvConfig>) {}

  async onModuleInit() {
    this.browser = await puppeteer.launch({
      headless: this.configService.get('NODE_ENV') !== 'production',
    });
  }

  async onModuleDestroy() {
    await this.browser.close();
  }

  async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch();
    }
    return this.browser;
  }
}
