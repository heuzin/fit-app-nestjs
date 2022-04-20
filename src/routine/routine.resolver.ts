import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Routine as RoutineEntity } from 'src/graphql';
import { CreateRoutineInput } from './dto/create-routine.input';
import { RoutineService } from './routine.service';

@Resolver(() => RoutineEntity)
@UseGuards(GqlAuthGuard)
export class RoutineResolver {
  constructor(private routineService: RoutineService) {}

  @Mutation(() => RoutineEntity)
  async createRoutine(
    @GetUser() user: User,
    @Args('createRoutineInput') createRoutineInput: CreateRoutineInput,
  ) {
    return await this.routineService.createRoutine(user, createRoutineInput);
  }
}
