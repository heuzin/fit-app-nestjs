
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Type {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    PUSH = "PUSH",
    PULL = "PULL",
    LEGS = "LEGS"
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export class CreateUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class AuthCredentialsInput {
    email: string;
    password: string;
}

export class CreateUserProfileInput {
    bio: string;
    height: string;
    weight: string;
}

export class CreateRoutineInput {
    type: Type;
}

export abstract class IMutation {
    abstract signup(createUserInput: CreateUserInput): User | Promise<User>;

    abstract sigin(authCredentialsInput: AuthCredentialsInput): Token | Promise<Token>;

    abstract createUserProfile(createUserProfileInput: CreateUserProfileInput): Profile | Promise<Profile>;

    abstract createRoutine(createRoutineInput?: Nullable<CreateRoutineInput>): Routine | Promise<Routine>;
}

export class Token {
    accessToken: string;
}

export class Profile {
    id: number;
    bio: string;
    weight: number;
    height: number;
    user: User;
    userId: number;
}

export abstract class IQuery {
    abstract userProfile(): Profile | Promise<Profile>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: number): User | Promise<User>;
}

export class Routine {
    id: number;
    type: Type;
    createdAt: DateTime;
    updatedAt: DateTime;
    user: User;
    userId: number;
}

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    role: Role;
    profile?: Nullable<Profile>;
}

export type DateTime = any;
type Nullable<T> = T | null;
