import { SetMetadata } from '@nestjs/common';

export const CACHE_METADATA = 'CACHE_METADATA';

/**
 * @description 캐시를 사용할 메소드에 붙이는 데코레이터입니다. ttl: 10초, key는 캐시키, validate는 캐시를 set하는 조건입니다.!
 * @param options
 * @example  {ttl: 10, key: 'myKey', validate: (value) => value !== null}
 * @constructor
 */
export interface CacheOptions {
  key?: string;
  ttl?: number;
  validate?: (value: any) => boolean;
}

export function Cacheable(options: CacheOptions = {}): MethodDecorator {
  return SetMetadata(CACHE_METADATA, options);
}
