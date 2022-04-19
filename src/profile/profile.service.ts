import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { CreateUserProfileInput } from './dto/create-profile.input';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async getUserProfileById(id: number) {
    const profile = await this.profileRepository.profile.findUnique({
      where: { userId: id },
    });

    if (profile) {
      return profile;
    } else {
      throw new NotFoundException('User does not have a profile');
    }
  }

  async createUserProfile(
    user: User,
    createUserProfileInput: CreateUserProfileInput,
  ): Promise<Profile> {
    const profileExists = await this.profileRepository.profile.findUnique({
      where: { userId: user.id },
    });

    if (profileExists) {
      return await this.profileRepository.updateUserProfile(
        user,
        profileExists,
        createUserProfileInput,
      );
    } else {
      return await this.profileRepository.createUserProfile(
        user,
        createUserProfileInput,
      );
    }
  }
}
