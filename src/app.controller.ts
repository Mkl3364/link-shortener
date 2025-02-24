import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { Observable, map, of } from 'rxjs';
import { AppService } from './app.service';

interface ShortenResponse {
  hash: string;
}

interface ErrorResponse {
  error: string;
  code: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shorten')
  shorten(
    @Body('url') url: string,
  ): Observable<ShortenResponse | ErrorResponse> {
    if (!url) {
      return of({
        error: `No url provided. Please provide in the body.`,
        code: 400,
      });
    }
    return this.appService.shorten(url).pipe(map((hash) => ({ hash })));
  }

  @Get(':hash')
  @Redirect()
  retrieveAndRedirect(@Param('hash') hash): Observable<{ url: string }> {
    return this.appService.retrieve(hash).pipe(map((url) => ({ url })));
  }
}
