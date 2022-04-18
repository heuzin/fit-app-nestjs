import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { User as UserEntity } from 'src/graphql';

import { AuthService } from './auth.service';
import { JwtEntity } from './entities/jwt.entity';
import { CreateUserInput } from './dto/create-user.input';
import { AuthCredentialsInput } from './dto/auth-credentials-input';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserEntity)
  signup(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.authService.createUser(createUserInput);
  }

  @Mutation(() => JwtEntity)
  sigin(
    @Args('authCredentialsInput') authCredentialsInput: AuthCredentialsInput,
  ): Promise<{ accessToken: string }> {
    return this.authService.sigin(authCredentialsInput);
  }
}
