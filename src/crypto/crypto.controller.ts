import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('sign')
  signJson(@Body() json: object): string {
    return this.cryptoService.signJson(json);
  }

  @Get('verify')
  verifyJson(@Query('token') token: string): object | null {
    return this.cryptoService.verifyJson(token);
  }
}
