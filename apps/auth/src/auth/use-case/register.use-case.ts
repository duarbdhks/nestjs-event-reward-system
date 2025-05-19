import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findByUsername(registerDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userRepository.create({
      username: registerDto.username,
      password: hashedPassword,
      role: 'USER',
    });

    const { password, ...result } = user.toObject();
    return result;
  }
}
