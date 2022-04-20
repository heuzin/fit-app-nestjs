import { InputType } from '@nestjs/graphql';
import { Type } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRoutineInput {
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;
}
