import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @Field()
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @Field()
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @Field()
  lastName: string;
}
