import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CryptoService } from './crypto.service';
import { CreateJsonDto } from './dto/create-json.dto';

@ApiTags('crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('sign')
  @ApiOperation({ summary: 'Firmar un objeto JSON' })
  @ApiResponse({ status: 201, description: 'El token firmado.' })
  signJson(@Body() createJsonDto: CreateJsonDto): string {
    return this.cryptoService.signJson(createJsonDto);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verificar un token y devolver el JSON original' })
  @ApiResponse({ status: 200, description: 'El JSON original o null.' })
  verifyJson(@Query('token') token: string): object | null {
    return this.cryptoService.verifyJson(token);
  }
}
