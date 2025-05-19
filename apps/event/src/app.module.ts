import { CustomJwtModule } from '@common/jwt/custom-jwt.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { EventModule } from './event/event.module';
import { RewardRequestModule } from './reward-request/reward-request.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
    CustomJwtModule,
    EventModule,
    RewardModule,
    RewardRequestModule,
  ],
})
export class AppModule {}
