import { Injectable } from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserProfileInput } from './dto/create-profile.input';

@Injectable()
export class ProfileRepository extends DatabaseService {
  async getLoggedInUserProfile(user: User) {
    const { id } = user;
    const loggedInUser = await this.user.findUnique({ where: { id } });
    console.log(loggedInUser);
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
        // userId: user.id,
        user: {
          connect: { id: user.id },
        },
      },
    });
  }
}
