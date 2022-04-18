import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Profile as ProfileEntity } from 'src/graphql';
import { Profile, User } from '@prisma/client';

import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { ProfileService } from './profile.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateUserProfileInput } from './dto/create-profile.input';
import { UserService } from 'src/user/user.service';

@Resolver(() => ProfileEntity)
@UseGuards(GqlAuthGuard)
export class ProfileResolver {
  constructor(
    private profileService: ProfileService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  @Query(() => ProfileEntity)
  async userProfile(@GetUser() user: User) {
    const { id } = user;
    return await this.profileService.getUserProfileById(id);
  }

  @Mutation(() => ProfileEntity)
  async createUserProfile(
    @GetUser() user: User,
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ): Promise<Profile> {
    return await this.profileService.createUserProfile(
      user,
      createUserProfileInput,
    );
  }

  @ResolveField()
  async user(@Parent() profile: Profile) {
    const { userId } = profile;
    return await this.userService.getUserBydId(userId);
  }
}
