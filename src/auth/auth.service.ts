import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { AuthRepository } from './auth.repository';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserInput } from './dto/create-user.input';
import { AuthCredentialsInput } from './dto/auth-credentials-input';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  createUser(createUserInput: CreateUserInput): Promise<User> {
    return this.authRepository.createUser(createUserInput);
  }

  async sigin(
    authCredentialsInput: AuthCredentialsInput,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsInput;
    const user = await this.authRepository.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
