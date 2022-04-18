import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { RoutineRepository } from './routine.repository';
import { RoutineResolver } from './routine.resolver';
import { RoutineService } from './routine.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [RoutineResolver, RoutineService, RoutineRepository],
})
export class RoutineModule {}
