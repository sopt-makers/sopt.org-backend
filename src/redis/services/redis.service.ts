import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  async set(key: string, value: any, option?: any) {
    await this.cache.set(key, value, option);
  }

  async reset() {
    await this.cache.reset();
  }

  async del(key: string) {
    await this.cache.del(key);
  }

  async getMultipleKeysPrefix(prefix: string) {
    return ((await this.cache.store) as any).keys(prefix + '*');
  }

  async deleteMultipleKeysPrefix(prefix: string) {
    const keys = await this.getMultipleKeysPrefix(prefix);
    const promiseList: any[] = [];
    for (const key of keys) {
      promiseList.push(async () => {
        await this.del(key);
      });
    }
    await Promise.all(
      promiseList.map((promise) => {
        return promise();
      }),
    );
  }
}
