import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';

@Injectable()
export class UserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user.toObject();
    return result;
  }
}
