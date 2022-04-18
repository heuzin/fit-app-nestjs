import { forwardRef, Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { User as UserEntity } from 'src/graphql';
import { ProfileService } from 'src/profile/profile.service';

import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
  ) {}

  @Query(() => [UserEntity])
  async users(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Query(() => UserEntity)
  async user(@Args('id') id: number) {
    return await this.userService.getUserBydId(id);
  }

  @ResolveField()
  async profile(@Parent() parent: User) {
    const { id } = parent;
    return await this.profileService.getUserProfileById(id);
  }
}
