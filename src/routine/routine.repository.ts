import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateRoutineInput } from './dto/create-routine.input';

@Injectable()
export class RoutineRepository extends DatabaseService {
  async createRoutine(user: User, createRoutineInput: CreateRoutineInput) {
    const { type } = createRoutineInput;

    return await this.routine.create({
      data: {
        type: type,
        user: {
          connect: { id: user.id },
        },
      },
    });
  }
}
