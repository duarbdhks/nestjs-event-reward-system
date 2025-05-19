import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { LoginUseCase } from './use-case/login.use-case';
import { RegisterUseCase } from './use-case/register.use-case';
import { UserProfileUseCase } from './use-case/user-profile.use-case';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly userProfileUseCase: UserProfileUseCase,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.registerUseCase.execute(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userProfileUseCase.execute(req.user.userId);
  }
}
