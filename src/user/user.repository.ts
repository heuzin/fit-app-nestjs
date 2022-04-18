import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserRepository extends DatabaseService {
  async getUsers(): Promise<User[]> {
    return await this.user.findMany();
  }
}
