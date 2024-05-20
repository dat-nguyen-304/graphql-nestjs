import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserSetting } from '../userSetting/userSetting.model';
import { UserSettingService } from '../userSetting/userSetting.service';
import { UserSettingResolver } from '../userSetting/userSetting.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UserResolver,
    UserSettingResolver,
    UserService,
    UserSettingService,
  ],
})
export class UserModule {}
