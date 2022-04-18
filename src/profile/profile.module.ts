import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { ProfileRepository } from './profile.repository';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [forwardRef(() => UserModule), DatabaseModule, AuthModule],
  providers: [ProfileResolver, ProfileService, ProfileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}
