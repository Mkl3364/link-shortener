import { RedisClientType, createClient } from 'redis';
import { Observable, from, mergeMap } from 'rxjs';
import { AppRepository } from './app.repository';

export class AppRepositoryRedis implements AppRepository {
  private readonly redisClient: RedisClientType;

  constructor() {
    const host = process.env.REDIS_HOST || 'redis';
    const port = +process.env.REDIS_PORT || 6379;
    this.redisClient = createClient({
      url: `redis://${host}:${port}`,
    });
    from(this.redisClient.connect()).subscribe({ error: console.error });
  }

  put(hash: string, url: string): Observable<string> {
    return from(this.redisClient.set(hash, url)).pipe(
      mergeMap(() => from(this.redisClient.get(hash))),
    );
  }
  get(hash: string): Observable<string> {
    return from(this.redisClient.get(hash));
  }
}
