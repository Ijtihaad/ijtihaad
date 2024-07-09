import { Injectable } from '@nestjs/common';

@Injectable()
export class JamasService {
  getHello(): string {
    return 'Hello World!';
  }
}
