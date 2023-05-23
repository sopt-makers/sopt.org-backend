import {
  CACHE_MANAGER,
  CacheModule as NestCacheModule,
  DynamicModule,
  Inject,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import {
  DiscoveryModule,
  DiscoveryService,
  MetadataScanner,
  Reflector,
} from '@nestjs/core';
import { Cache } from 'cache-manager';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { CACHE_METADATA, CacheOptions } from './cacheable.decorator';

@Module({
  imports: [DiscoveryModule, NestCacheModule.register()],
})
export class CacheModule implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly scanner: MetadataScanner,
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  static forRoot(): DynamicModule {
    return {
      module: CacheModule,
      global: true,
    };
  }

  onModuleInit(): void {
    this.registerAllCache();
  }

  /**
   * @description NestJS 의 DiscoveryService 를 이용하여 onModuleInit시점에 모든 Provider 를 탐색하고, Cache 데코레이터를 적용시킵니다.
   * @private
   */
  private registerAllCache(): void {
    this.discoveryService
      .getProviders()
      .filter((wrapper: InstanceWrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ instance }) => {
        this.scanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),
          this.registerCache(instance),
        );
      });
  }

  /**
   *
   * @description @Cacheable 데코레이터가 붙은 메소드를 캐싱합니다.
   * @private
   */
  private registerCache(instance: any) {
    return (methodName: any) => {
      const methodRef = instance[methodName];
      const metadata: CacheOptions = this.reflector.get(
        CACHE_METADATA,
        methodRef,
      );
      if (!metadata) {
        return;
      }

      const { ttl = Infinity, key: customKey, validate = Boolean } = metadata;
      const cacheKeyPrefix = `${instance.constructor.name}.${methodName}`;

      const originMethod = (...args: unknown[]) =>
        methodRef.call(instance, ...args);

      instance[methodName] = async (...args: unknown[]) => {
        const key = customKey
          ? customKey
          : args.length
          ? JSON.stringify(args)
          : null;

        const cacheKeySuffix = key ? `(${key})` : '';
        const cacheKey = cacheKeyPrefix + cacheKeySuffix;
        const cached = await this.cacheManager.get(cacheKey);

        if (Boolean(cached)) {
          console.log('cache hit');
          return cached;
        }

        const data = await originMethod(...args);

        if (!validate(data)) {
          return data;
        }

        await this.cacheManager.set(cacheKey, data, ttl);
        return data;
      };
    };
  }
}
