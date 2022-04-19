import { Injectable } from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserProfileInput } from './dto/create-profile.input';

@Injectable()
export class ProfileRepository extends DatabaseService {
  async getLoggedInUserProfile(user: User) {
    const { id } = user;
    const loggedInUser = await this.user.findUnique({ where: { id } });
    return loggedInUser;
  }

  async createUserProfile(
    user: User,
    createUserProfileInput: CreateUserProfileInput,
  ): Promise<Profile> {
    const { bio, weight, height } = createUserProfileInput;

    return await this.profile.create({
      data: {
        bio,
        weight: Number(weight),
        height: Number(height),
        user: {
          connect: { id: user.id },
        },
      },
    });
  }

  async updateUserProfile(
    user: User,
    profile: Profile,
    createUserProfileInput: CreateUserProfileInput,
  ): Promise<Profile> {
    const { bio, weight, height } = createUserProfileInput;

    return await this.profile.update({
      where: {
        userId: user.id,
      },
      data: {
        bio: bio ? bio : profile.bio,
        weight: weight ? Number(weight) : profile.weight,
        height: height ? Number(height) : profile.height,
      },
    });
  }
}
