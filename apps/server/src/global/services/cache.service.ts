import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async useCache<T>(callback: () => T, key: string) {
    this.logger.log(this.useCache.name);
    const value = await this.cacheManager.get<T>(key);

    if (value) {
      return value;
    }

    const data = await callback();

    await this.cacheManager.set(key, data);

    return data;
  }

  async delCache(key: string) {
    await this.cacheManager.del(key);
  }
}
