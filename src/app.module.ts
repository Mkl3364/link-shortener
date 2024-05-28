import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppRepositoryTag } from './app.repository';
import { AppService } from './app.service';
import { AppRepositoryRedis } from './app.repository.redis';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: AppRepositoryTag, useClass: AppRepositoryRedis },
  ],
})
export class AppModule {}
