import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(':Middleware:');
    console.time('Request-Response time');
    console.log('request-response');
    res.on('finish', () => console.timeEnd('Request-Response time'));
    next();
  }
}
