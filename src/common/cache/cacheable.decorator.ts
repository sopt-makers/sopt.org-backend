import { SetMetadata } from '@nestjs/common';

export const CACHE_METADATA = 'CACHE_METADATA';

export interface CacheOptions {
  key?: string;
  ttl?: number;
  validate?: (value: any) => boolean;
}

export function Cacheable(options: CacheOptions = {}): MethodDecorator {
  return SetMetadata(CACHE_METADATA, options);
}
