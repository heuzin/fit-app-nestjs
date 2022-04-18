import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const { req } = GqlExecutionContext.create(context).getContext();
    return req.user;
  },
);
