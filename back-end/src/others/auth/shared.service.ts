// shared.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  private token: string;
  private code: string;

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  setCode(code: string) {
    this.code = code;
  }

  getCode(): string {
    return this.code;
  }
}
