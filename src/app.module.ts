import { Module } from '@nestjs/common';
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ProfileModule } from './profile/profile.module';
import { RoutineModule } from './routine/routine.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: GraphQLISODateTime },
      driver: ApolloDriver,
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    RoutineModule,
    DatabaseModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
