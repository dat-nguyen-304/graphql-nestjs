import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { UserSettingService } from './UserSettingService';
import { UserSettingResolver } from 'src/graphql/resolver/UserSettingResolver';

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
