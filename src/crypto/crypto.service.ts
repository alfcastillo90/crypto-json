import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CryptoService {
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    this.secretKey = this.configService.get<string>('SECRET_KEY');
  }

  signJson(json: object): string {
    return jwt.sign(json, this.secretKey);
  }

  verifyJson(token: string): object | null {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      if (typeof decoded === 'object') {
        return decoded;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
