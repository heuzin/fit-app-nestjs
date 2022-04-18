import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/create-user.input';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthRepository extends DatabaseService {
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { firstName, lastName, email, password } = createUserInput;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await this.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      return user;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email already exists.`);
      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }
}
