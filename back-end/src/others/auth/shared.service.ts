// shared.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  private token: string;
  private code: string;
  private expirationTime: number;

  setToken(token: string) {
    this.token = token;
    this.expirationTime = Date.now() + 1000 * 60 * 15;
    // this.expirationTime = Date.now() + expiresIn;
    setTimeout(
      () => {
        this.clearCode();
      },
      1000 * 60 * 15,
    );
  }

  getToken(): string {
    return this.token;
  }

  setCode(code: string) {
    this.code = code;
  }

  getCode(): string | null {
    if (Date.now() > this.expirationTime) {
      this.clearCode();
      return null;
    }

    return this.code;
  }
  private clearCode() {
    this.code = '';
    this.expirationTime = 0;
  }
}
