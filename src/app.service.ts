import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1> sopt.org backend server started </h1>';
  }
}
