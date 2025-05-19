import { JwtStrategy } from '@guard/jwt.strategy';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './use-case/login.use-case';
import { RegisterUseCase } from './use-case/register.use-case';
import { UserProfileUseCase } from './use-case/user-profile.use-case';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase, RegisterUseCase, UserProfileUseCase, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
