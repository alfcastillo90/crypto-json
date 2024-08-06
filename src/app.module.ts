import { Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [CryptoModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
