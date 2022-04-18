import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.user.findMany();
  }

  async getUserBydId(id: number): Promise<User> {
    const user = await this.userRepository.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      throw new NotFoundException('User does not exists');
    }
  }
}
