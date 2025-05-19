import { CustomJwtModule } from '@common/jwt/custom-jwt.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CustomJwtModule,
    ProxyModule,
  ],
})
export class AppModule {}
