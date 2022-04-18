import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Routine as RoutineEntity } from 'src/graphql';

@Resolver(() => RoutineEntity)
@UseGuards(GqlAuthGuard)
export class RoutineResolver {}
