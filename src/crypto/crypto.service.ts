import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CryptoService {
  private readonly secretKey = 'your-secret-key'; // Cambia esto por una clave secreta segura

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
