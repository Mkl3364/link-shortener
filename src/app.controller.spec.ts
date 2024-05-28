import { Test, TestingModule } from '@nestjs/testing';
import { mergeMap, tap } from 'rxjs';
import { AppRepositoryTag, AppRepositoryHashMap } from './app.repository';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppRepositoryTag, useClass: AppRepositoryHashMap },
        AppService,
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('retrieve', () => {
    it('should retrieve the saved URL', (done) => {
      const url = 'docker.com';
      appService
        .shorten(url)
        .pipe(mergeMap((hash) => appService.retrieve(hash)))
        .pipe(tap((retrieved) => expect(retrieved).toEqual(url)))
        .subscribe({ complete: done });
    });
  });
});
