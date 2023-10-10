import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get(): string {
    return 'Welcome to Metaverse backend API';
  }
}
