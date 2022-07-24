import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hallo semuanya.. \n PT WHALEZ DIGITAL TEKNOLOGI \n Sukses !`;
  }
}
