import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateRoutineInput } from './dto/create-routine.input';
import { RoutineRepository } from './routine.repository';

@Injectable()
export class RoutineService {
  constructor(private routineRepository: RoutineRepository) {}

  async createRoutine(user: User, createRoutineInput: CreateRoutineInput) {
    return await this.routineRepository.createRoutine(user, createRoutineInput);
  }
}
